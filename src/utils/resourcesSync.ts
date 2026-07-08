import type { ResourceItem } from '../types/resources';
import { hasSupabaseConfig, supabase } from './supabaseClient';

export interface ResourcePersistenceState {
  customResources: ResourceItem[];
  deletedInitialIds: string[];
  members: { id: string; name: string; email?: string }[];
  budget: { total: string; allocated: string };
  lastUpdated?: string;
}

const STORAGE_KEY = 'ccrc-resources-sync';
const LEGACY_CUSTOM_KEY = 'ccrc-resources-custom';
const LEGACY_DELETED_KEY = 'ccrc-resources-deleted';
const LEGACY_MEMBERS_KEY = 'ccrc-selected-members';
const LEGACY_BUDGET_KEY = 'ccrc-resources-budget';

const uniqueById = (items: ResourceItem[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }

    seen.add(item.id);
    return true;
  });
};

const uniqueStrings = (items: string[]) => Array.from(new Set(items));

const INLINE_DATA_URL_LIMIT = 100_000;

const shouldStripInlineUrl = (value: string) => {
  if (!value.startsWith('data:')) {
    return false;
  }

  if (value.startsWith('data:image/') || value.startsWith('data:video/')) {
    return true;
  }

  return value.length > INLINE_DATA_URL_LIMIT;
};

const sanitizeResourceForStorage = (resource: ResourceItem): ResourceItem => ({
  ...resource,
  previewUrl: shouldStripInlineUrl(resource.previewUrl) ? '' : resource.previewUrl,
  downloadUrl: shouldStripInlineUrl(resource.downloadUrl) ? '' : resource.downloadUrl,
});

const sanitizeStateForStorage = (state: ResourcePersistenceState): ResourcePersistenceState => ({
  ...state,
  customResources: state.customResources.map(sanitizeResourceForStorage),
});

const buildDefaultState = (): ResourcePersistenceState => ({
  customResources: [],
  deletedInitialIds: [],
  members: [],
  budget: { total: '', allocated: '' },
  lastUpdated: new Date().toISOString(),
});

const normalizeState = (value: Partial<ResourcePersistenceState> | null | undefined): ResourcePersistenceState => {
  const fallback = buildDefaultState();

  return {
    customResources: Array.isArray(value?.customResources) ? uniqueById(value.customResources) : fallback.customResources,
    deletedInitialIds: Array.isArray(value?.deletedInitialIds) ? uniqueStrings(value.deletedInitialIds) : fallback.deletedInitialIds,
    members: Array.isArray(value?.members) ? value.members : fallback.members,
    budget: value?.budget ? { total: value.budget.total ?? '', allocated: value.budget.allocated ?? '' } : fallback.budget,
    lastUpdated: value?.lastUpdated || fallback.lastUpdated,
  };
};

const getSyncEndpoint = (): string => (import.meta.env.VITE_RESOURCES_SYNC_URL || '').trim();

const getSupabasePayload = () => {
  if (!hasSupabaseConfig || !supabase) {
    return null;
  }

  return supabase;
};

type ResourceStateSyncHandler = () => void;

const persistStateLocally = (nextState: ResourcePersistenceState) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    localStorage.setItem(LEGACY_CUSTOM_KEY, JSON.stringify(nextState.customResources));
    localStorage.setItem(LEGACY_DELETED_KEY, JSON.stringify(nextState.deletedInitialIds));
    localStorage.setItem(LEGACY_MEMBERS_KEY, JSON.stringify(nextState.members));
    localStorage.setItem(LEGACY_BUDGET_KEY, JSON.stringify(nextState.budget));
  } catch {
    // Keep the shared state flow working even when the browser storage quota is full.
  }

  window.dispatchEvent(new Event('ccrc-resources-sync'));
};

export const getStoredResourceState = (): ResourcePersistenceState => {
  if (typeof window === 'undefined') {
    return buildDefaultState();
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return normalizeState(JSON.parse(saved) as Partial<ResourcePersistenceState>);
    }
  } catch {
    // fall back to the older keys below
  }

  try {
    return normalizeState({
      customResources: JSON.parse(localStorage.getItem(LEGACY_CUSTOM_KEY) || '[]') as ResourceItem[],
      deletedInitialIds: JSON.parse(localStorage.getItem(LEGACY_DELETED_KEY) || '[]') as string[],
      members: JSON.parse(localStorage.getItem(LEGACY_MEMBERS_KEY) || '[]') as { id: string; name: string; email?: string }[],
      budget: JSON.parse(localStorage.getItem(LEGACY_BUDGET_KEY) || '{"total":"","allocated":""}') as { total: string; allocated: string },
    });
  } catch {
    return buildDefaultState();
  }
};

export const loadResourceState = async (): Promise<ResourcePersistenceState> => {
  const localState = getStoredResourceState();
  const endpoint = getSyncEndpoint();
  const supabaseClient = getSupabasePayload();

  if (!endpoint && !supabaseClient) {
    return localState;
  }

  try {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('resources_state').select('payload').eq('id', 'portal').maybeSingle();
      if (!error && data?.payload) {
        const remoteState = normalizeState(data.payload as ResourcePersistenceState);
        persistStateLocally(sanitizeStateForStorage(remoteState));
        return remoteState;
      }
    }

    if (!endpoint) {
      return localState;
    }

    const response = await fetch(endpoint, { method: 'GET', headers: { Accept: 'application/json' } });
    if (!response.ok) {
      throw new Error('Sync endpoint unavailable');
    }

    const payload = await response.json().catch(() => null);
    const remoteState = normalizeState(payload && typeof payload === 'object' && 'customResources' in payload ? (payload as ResourcePersistenceState) : null);
    if (remoteState) {
      persistStateLocally(sanitizeStateForStorage(remoteState));
      return remoteState;
    }

    return localState;
  } catch {
    return localState;
  }
};

export const subscribeToResourceState = (onChange: ResourceStateSyncHandler) => {
  const supabaseClient = getSupabasePayload();

  if (!supabaseClient) {
    return () => {};
  }

  const channel = supabaseClient
    .channel('resources_state_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'resources_state',
        filter: 'id=eq.portal',
      },
      () => {
        onChange();
      },
    )
    .subscribe();

  return () => {
    supabaseClient.removeChannel(channel);
  };
};

export const persistResourceState = async (updates: Partial<ResourcePersistenceState>): Promise<ResourcePersistenceState> => {
  const nextState = normalizeState({
    ...getStoredResourceState(),
    ...updates,
    lastUpdated: new Date().toISOString(),
  });

  const storedState = sanitizeStateForStorage(nextState);

  persistStateLocally(storedState);

  const endpoint = getSyncEndpoint();
  const supabaseClient = getSupabasePayload();

  if (!endpoint && !supabaseClient) {
    return nextState;
  }

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.from('resources_state').upsert({ id: 'portal', payload: storedState }, { onConflict: 'id' });
      if (error) {
        console.warn('Supabase resources_state sync failed:', error.message);
      }
      return nextState;
    }

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(storedState),
    });
  } catch {
    // Keep the local copy working even when the shared endpoint is unavailable.
  }

  return nextState;
};

export const clearResourceSync = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_CUSTOM_KEY);
  localStorage.removeItem(LEGACY_DELETED_KEY);
  localStorage.removeItem(LEGACY_MEMBERS_KEY);
  localStorage.removeItem(LEGACY_BUDGET_KEY);
  window.dispatchEvent(new Event('ccrc-resources-sync'));
};
