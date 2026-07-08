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
    customResources: Array.isArray(value?.customResources) ? value.customResources : fallback.customResources,
    deletedInitialIds: Array.isArray(value?.deletedInitialIds) ? value.deletedInitialIds : fallback.deletedInitialIds,
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

const persistStateLocally = (nextState: ResourcePersistenceState) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  localStorage.setItem(LEGACY_CUSTOM_KEY, JSON.stringify(nextState.customResources));
  localStorage.setItem(LEGACY_DELETED_KEY, JSON.stringify(nextState.deletedInitialIds));
  localStorage.setItem(LEGACY_MEMBERS_KEY, JSON.stringify(nextState.members));
  localStorage.setItem(LEGACY_BUDGET_KEY, JSON.stringify(nextState.budget));
  window.dispatchEvent(new Event('ccrc-resources-sync'));
};

const mergeStates = (
  localState: ResourcePersistenceState,
  remoteState: ResourcePersistenceState | null | undefined,
): ResourcePersistenceState => {
  if (!remoteState) {
    return localState;
  }

  const localTime = Date.parse(localState.lastUpdated || '0');
  const remoteTime = Date.parse(remoteState.lastUpdated || '0');

  if (remoteTime > localTime) {
    return normalizeState(remoteState);
  }

  return localState;
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
        const merged = mergeStates(localState, remoteState);
        persistStateLocally(merged);
        return merged;
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
    const merged = mergeStates(localState, remoteState);
    persistStateLocally(merged);
    return merged;
  } catch {
    return localState;
  }
};

export const persistResourceState = async (updates: Partial<ResourcePersistenceState>): Promise<ResourcePersistenceState> => {
  const nextState = normalizeState({
    ...getStoredResourceState(),
    ...updates,
    lastUpdated: new Date().toISOString(),
  });

  persistStateLocally(nextState);

  const endpoint = getSyncEndpoint();
  const supabaseClient = getSupabasePayload();

  if (!endpoint && !supabaseClient) {
    return nextState;
  }

  try {
    if (supabaseClient) {
      await supabaseClient.from('resources_state').upsert({ id: 'portal', payload: nextState }, { onConflict: 'id' });
      return nextState;
    }

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(nextState),
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
