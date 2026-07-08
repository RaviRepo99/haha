import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BookOpen,
  Code2,
  DollarSign,
  FileText,
  ImagePlus,
  Layers3,
  LogOut,
  Package2,
  Search,
  Sparkles,
  Star,
  Download,
  Eye,
  Share2,
  ShieldCheck,
  Clock3,
  Trash,
  Users,
} from 'lucide-react';
import { categoryMeta, resources as initialResources } from '../data/resources';
import type { ResourceCategory, ResourceItem } from '../types/resources.ts';
import { loadResourceState, persistResourceState } from '../utils/resourcesSync';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgeCheck,
  BookOpen,
  Code2,
  DollarSign,
  FileText,
  ImagePlus,
  Layers3,
  Package2,
  Users,
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });

const isCustomResource = (resource: ResourceItem) => resource.id.startsWith('custom-');

const buildVisibleResources = (deletedInitialIds: string[], customResources: ResourceItem[]) => [
  ...initialResources.filter((resource) => !deletedInitialIds.includes(resource.id)),
  ...customResources,
];

const ResourcePortalPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ResourceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'downloads'>('newest');
  const [favorites, setFavorites] = useState<string[]>(['cert-01']);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ccrc-resources-auth');
    if (stored !== 'true') {
      setIsAuthenticated(false);
    }
  }, []);

  const [resourcesState, setResourcesState] = useState<ResourceItem[]>(initialResources);
  const [deletedInitialIds, setDeletedInitialIds] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState<ResourceCategory | 'other'>('other');
  const [uploadFileType, setUploadFileType] = useState('File');
  const [uploadSize, setUploadSize] = useState('0 KB');
  const [uploadPreviewType, setUploadPreviewType] = useState<'image' | 'pdf' | 'video' | 'markdown' | 'code' | 'text' | 'binary'>('pdf');
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState('');
  const [uploadDownloadUrl, setUploadDownloadUrl] = useState('');
  const [uploadFileData, setUploadFileData] = useState<string | null>(null);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState<{ id: string; name: string; email?: string }[]>([]);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [showBudget, setShowBudget] = useState(false);
  const [totalBudget, setTotalBudget] = useState('');
  const [allocatedBudget, setAllocatedBudget] = useState('');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase();
    const filtered = resourcesState.filter((resource) => {
      const matchesCategory = category === 'all' || resource.category === category;
      const matchesSearch =
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.fileType.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'oldest') return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });

    return sorted;
  }, [category, search, sortBy, resourcesState]);

  useEffect(() => {
    const syncFromStorage = async () => {
      const storedState = await loadResourceState();
      const nextDeletedInitialIds = storedState.deletedInitialIds || [];
      const nextCustomResources = storedState.customResources || [];

      setDeletedInitialIds(nextDeletedInitialIds);
      setMembers(storedState.members || []);
      setTotalBudget(storedState.budget?.total || '');
      setAllocatedBudget(storedState.budget?.allocated || '');
      setResourcesState(buildVisibleResources(nextDeletedInitialIds, nextCustomResources));
    };

    const handleSync = () => {
      void syncFromStorage();
    };

    void syncFromStorage();
    window.addEventListener('ccrc-resources-sync', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('ccrc-resources-sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const handleUploadSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUploading(true);
    const id = `custom-${Date.now()}`;
    const normalizedFileType = (uploadFileType || 'Document') as ResourceItem['fileType'];
    const newRes: ResourceItem = {
      id,
      title: uploadTitle || 'Untitled Resource',
      description: uploadDescription || '',
      category: (uploadCategory as ResourceCategory) || 'other',
      fileType: normalizedFileType,
      size: uploadSize || '0 KB',
      uploadedAt: new Date().toISOString().split('T')[0],
      downloads: 0,
      previewType: uploadPreviewType,
      previewUrl: uploadFileData || uploadPreviewUrl || uploadDownloadUrl || '',
      downloadUrl: uploadFileData || uploadDownloadUrl || uploadPreviewUrl || '',
    };

    const customResources = resourcesState.filter(isCustomResource);

    const nextState = await persistResourceState({
      customResources: [newRes, ...customResources.filter((resource) => resource.id !== newRes.id)],
    });

    const nextDeletedInitialIds = nextState.deletedInitialIds || [];
    setDeletedInitialIds(nextDeletedInitialIds);
    setResourcesState(buildVisibleResources(nextDeletedInitialIds, nextState.customResources || []));

    setUploading(false);
    setShowUpload(false);
    setUploadTitle('');
    setUploadDescription('');
    setUploadPreviewUrl('');
    setUploadDownloadUrl('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const sizeBytes = f.size;
    const warnSize = 1.5 * 1024 * 1024; // 1.5 MB
    const blockSize = 4 * 1024 * 1024; // 4 MB
    if (sizeBytes > blockSize) {
      alert('File too large for local storage (limit ~4MB). Please use a smaller file or cloud upload.');
      return;
    }
    if (sizeBytes > warnSize) {
      alert('Large file: storing in browser may fail if many files exist. Consider using cloud upload.');
    }
    setUploadSize(sizeBytes > 1024 * 1024 ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB` : `${(sizeBytes / 1024).toFixed(1)} KB`);

    const mime = f.type;
    const extension = f.name.split('.').pop()?.toLowerCase() || '';
    let nextPreviewType: ResourceItem['previewType'] = 'binary';
    let nextFileType: ResourceItem['fileType'] = 'Document';

    if (mime.startsWith('image/')) {
      nextPreviewType = 'image';
      nextFileType = 'Image';
    } else if (mime === 'application/pdf') {
      nextPreviewType = 'pdf';
      nextFileType = 'PDF';
    } else if (mime.startsWith('video/')) {
      nextPreviewType = 'video';
      nextFileType = 'Video';
    } else if (mime === 'text/markdown' || extension === 'md') {
      nextPreviewType = 'markdown';
      nextFileType = 'Markdown';
    } else if (mime.startsWith('text/') || ['js', 'ts', 'py', 'java', 'c', 'cpp', 'json', 'html', 'css'].includes(extension)) {
      nextPreviewType = 'code';
      nextFileType = ['md', 'txt', 'js', 'ts', 'py', 'java', 'c', 'cpp'].includes(extension) ? 'Code' : 'Text';
    } else {
      nextPreviewType = 'binary';
      if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z'].includes(extension)) {
        nextFileType = 'Document';
      }
    }

    setUploadPreviewType(nextPreviewType);
    setUploadFileType(nextFileType);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadFileData(result);
      setUploadPreviewUrl(result);
      setUploadDownloadUrl(result);
    };
    reader.readAsDataURL(f);
  };

  const handleAddMember = async () => {
    if (!memberName.trim()) return;
    const id = `member-${Date.now()}`;
    const next = [{ id, name: memberName.trim(), email: memberEmail.trim() || undefined }, ...members];
    setMembers(next);
    await persistResourceState({ members: next });
    setMemberName('');
    setMemberEmail('');
  };

  const handleRemoveMember = async (id: string) => {
    const next = members.filter((m) => m.id !== id);
    setMembers(next);
    await persistResourceState({ members: next });
  };

  const saveBudget = async () => {
    await persistResourceState({ budget: { total: totalBudget, allocated: allocatedBudget } });
    setShowBudget(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this uploaded resource?')) return;
    if (id.startsWith('custom-')) {
      const nextCustom = resourcesState.filter((resource) => resource.id !== id && isCustomResource(resource));
      await persistResourceState({ customResources: nextCustom });
      setResourcesState((prev) => prev.filter((resource) => resource.id !== id));
      return;
    }

    const nextDeleted = Array.from(new Set([...deletedInitialIds, id]));
    await persistResourceState({ deletedInitialIds: nextDeleted });
    setDeletedInitialIds(nextDeleted);
    setResourcesState((prev) => prev.filter((resource) => resource.id !== id));
  };

  const clearCustomUploads = async () => {
    if (!window.confirm('Clear all uploaded resources? This cannot be undone.')) return;
    await persistResourceState({ customResources: [] });
    setResourcesState(buildVisibleResources(deletedInitialIds || [], []));
  };

  const handleLogout = () => {
    localStorage.removeItem('ccrc-resources-auth');
    setIsAuthenticated(false);
    navigate('/resources');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl border-slate-200 bg-white/80`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img src="/ccrc_it_logo.jpg" alt="CCRC logo" className="h-12 w-12 rounded-lg shadow-md object-cover" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 dark:border-red-700 dark:bg-slate-900/60 dark:text-red-300">
                    <Sparkles className="h-4 w-4" />
                    Premium resources hub
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-semibold sm:text-4xl">Welcome back, CCRC member</h1>
                  <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600">
                    Browse curated certificates, source codes, notes, and event assets in one polished place.
                  </p>
                </div>
              </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setShowUpload(true)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition">
                Upload Resource
              </button>
              <button onClick={clearCustomUploads} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition">
                Clear uploads
              </button>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[2rem] border p-5 shadow-xl border-slate-200 bg-white/80`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-600">Search resources</p>
                <h2 className="mt-2 text-xl font-semibold">Find anything instantly</h2>
              </div>
                <div className={`flex items-center gap-2 rounded-full border px-4 py-3 border-slate-200 bg-slate-100`}>
                <Search className="h-4 w-4 text-red-500" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, type, or topic" className={`w-48 bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-500`} />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[2rem] border p-5 shadow-xl border-slate-200 bg-white/80`}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-red-50/50 p-3 text-red-600 dark:text-red-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-600">Secure access</p>
                <p className="text-sm text-slate-600">Only authenticated members can view this portal.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categoryMeta.map((item) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            const count = resourcesState.filter((resource) => resource.category === item.id).length;
            return (
              <motion.div key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setCategory(item.id)} className={`group rounded-[1.5rem] border p-5 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl border-slate-200 bg-white/80 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-red-50 p-3 text-red-600 dark:text-red-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600`}>{count} items</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <button type="button" onClick={(e) => { e.stopPropagation(); setUploadCategory(item.id); setShowUpload(true); }} className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition">
                  Upload to {item.name}
                </button>
              </motion.div>
            );
          })}
        </motion.section>

        <section className={`rounded-[2rem] border p-4 shadow-xl sm:p-6 border-slate-200 bg-white/80`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured resources</h2>
              <p className="mt-2 text-sm text-slate-600">Curated for students, volunteers, and club leads.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select value={category} onChange={(event) => setCategory(event.target.value as ResourceCategory | 'all')} className={`rounded-full border px-4 py-2 text-sm outline-none border-slate-200 bg-slate-50 text-slate-900`}>
                <option value="all">All categories</option>
                {categoryMeta.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'newest' | 'oldest' | 'downloads')} className={`rounded-full border px-4 py-2 text-sm outline-none border-slate-200 bg-slate-50 text-slate-900`}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="downloads">Most downloaded</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {filteredResources.map((resource) => {
              const isFavorite = favorites.includes(resource.id);
              return (
                <motion.article key={resource.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[1.5rem] border p-5 shadow-lg border-slate-200 bg-slate-50`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-500">{resource.category.replace('-', ' ')}</p>
                      <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleFavorite(resource.id)} className={`rounded-full p-2 ${isFavorite ? 'text-amber-400' : 'text-slate-400'}`}>
                        <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleDelete(resource.id); if (selectedResource?.id === resource.id) setSelectedResource(null); }} className="rounded-full p-2 text-rose-600 hover:bg-rose-50">
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">{resource.fileType}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-slate-200 text-slate-700">{resource.size}</span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-slate-200 text-slate-700">{resource.downloads} downloads</span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    {formatDate(resource.uploadedAt)}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => setSelectedResource(resource)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                      <Eye className="h-4 w-4" /> Preview
                    </button>
                    <a href={resource.downloadUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-300">
                      <Download className="h-4 w-4" /> Download
                    </a>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                    {resource.id.startsWith('custom-') && (
                      <button onClick={() => handleDelete(resource.id)} className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600">
                        <Trash className="h-4 w-4" /> Delete
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </div>

      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 px-4 py-6 backdrop-blur">
          <div className={`w-full max-w-3xl rounded-[2rem] border p-5 shadow-2xl border-slate-200 bg-white`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Resource preview</p>
                <h3 className="mt-2 text-xl font-semibold">{selectedResource.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {selectedResource.id.startsWith('custom-') && (
                  <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleDelete(selectedResource.id); setSelectedResource(null); }} className="rounded-full border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600">
                    <Trash className="h-4 w-4 inline" /> Delete
                  </button>
                )}
                <button onClick={() => setSelectedResource(null)} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">Close</button>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-slate-200 p-4">
              {selectedResource.previewType === 'image' && <img src={selectedResource.previewUrl} alt={selectedResource.title} className="max-h-[420px] w-full rounded-[1rem] object-cover" />}
              {selectedResource.previewType === 'pdf' && <iframe title={selectedResource.title} src={selectedResource.previewUrl} className="h-[420px] w-full rounded-[1rem] border-0" />}
              {selectedResource.previewType === 'video' && <video src={selectedResource.previewUrl} controls className="w-full rounded-[1rem]" />}
              {selectedResource.previewType === 'markdown' && <div className="prose prose-slate max-w-none rounded-[1rem] bg-slate-50 p-4"><pre className="whitespace-pre-wrap">{selectedResource.previewUrl.replace('data:text/markdown;charset=utf-8,', '')}</pre></div>}
              {(selectedResource.previewType === 'code' || selectedResource.previewType === 'text') && <pre className="whitespace-pre-wrap rounded-[1rem] bg-slate-50 p-4 text-sm text-slate-900">{selectedResource.previewUrl.replace(/^data:text\/plain;charset=utf-8,/, '')}</pre>}
              {selectedResource.previewType === 'binary' && <div className="rounded-[1rem] bg-slate-50 p-6 text-sm text-slate-700">Preview is not available for this file type. Use Download to open it on your device.</div>}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Clock3 className="h-4 w-4" /> {formatDate(selectedResource.uploadedAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpload && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[1rem] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Upload Resource</h3>
              <button onClick={() => setShowUpload(false)} className="text-sm text-slate-600">Cancel</button>
            </div>
            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3">
              <input value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} placeholder="Title" className="w-full rounded-md border px-3 py-2" />
              <textarea value={uploadDescription} onChange={(e) => setUploadDescription(e.target.value)} placeholder="Short description" className="w-full rounded-md border px-3 py-2" />
              <div className="grid grid-cols-2 gap-3">
                <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as ResourceCategory)} className="rounded-md border px-3 py-2">
                  {categoryMeta.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input value={uploadFileType} onChange={(e) => setUploadFileType(e.target.value)} placeholder="File type (e.g. PDF)" className="rounded-md border px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={uploadSize} onChange={(e) => setUploadSize(e.target.value)} placeholder="Size (e.g. 2.4 MB)" className="rounded-md border px-3 py-2" />
                <select value={uploadPreviewType} onChange={(e) => setUploadPreviewType(e.target.value as any)} className="rounded-md border px-3 py-2">
                  <option value="pdf">PDF</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="markdown">Markdown</option>
                  <option value="code">Code</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <input value={uploadPreviewUrl} onChange={(e) => setUploadPreviewUrl(e.target.value)} placeholder="Preview URL (or leave empty)" className="w-full rounded-md border px-3 py-2" />
              <input value={uploadDownloadUrl} onChange={(e) => setUploadDownloadUrl(e.target.value)} placeholder="Download URL" className="w-full rounded-md border px-3 py-2" />
              <div className="mt-2">
                <label className="text-sm font-medium">Attach file</label>
                <input type="file" accept="*/*" onChange={handleFileChange} className="mt-1 w-full" />
                <p className="mt-1 text-xs text-slate-500">Supports .pdf, .docx, .xlsx, .pptx, .zip, .md, .js, .ts, .py, images, videos and more.</p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowUpload(false)} className="rounded-md border px-4 py-2">Cancel</button>
                <button type="submit" disabled={uploading} className="rounded-md bg-red-600 px-4 py-2 text-white">{uploading ? 'Uploading…' : 'Upload'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMembers && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[1rem] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Members</h3>
              <button onClick={() => setShowMembers(false)} className="text-sm text-slate-600">Close</button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Member name" className="flex-1 rounded-md border px-3 py-2" />
                <input value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} placeholder="Email (optional)" className="w-60 rounded-md border px-3 py-2" />
                <button onClick={handleAddMember} className="rounded-md bg-red-600 px-4 py-2 text-white">Add</button>
              </div>
              <div className="max-h-64 overflow-auto">
                {members.length === 0 && <p className="text-sm text-slate-500">No members selected yet.</p>}
                {members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
                    <div>
                      <div className="font-medium">{m.name}</div>
                      {m.email && <div className="text-sm text-slate-500">{m.email}</div>}
                    </div>
                    <div>
                      <button onClick={() => handleRemoveMember(m.id)} className="rounded-md border px-3 py-1 text-sm text-rose-600">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showBudget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-[1rem] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Budgets</h3>
              <button onClick={() => setShowBudget(false)} className="text-sm text-slate-600">Close</button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Total budget</label>
                <input value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} placeholder="e.g., 50000" className="w-full rounded-md border px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Allocated</label>
                <input value={allocatedBudget} onChange={(e) => setAllocatedBudget(e.target.value)} placeholder="e.g., 12000" className="w-full rounded-md border px-3 py-2 mt-1" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowBudget(false)} className="rounded-md border px-4 py-2">Cancel</button>
                <button onClick={saveBudget} className="rounded-md bg-red-600 px-4 py-2 text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcePortalPage;
