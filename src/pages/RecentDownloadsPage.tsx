import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { resources } from '../data/resources';

const RecentDownloadsPage = () => {
  const recentDownloads = [...resources].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
        <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
          <ArrowLeft className="h-4 w-4" /> Back to resources
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
            <Download className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Recent downloads</h1>
            <p className="mt-2 text-sm text-slate-400">A quick view of your recently accessed files.</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {recentDownloads.map((resource) => (
            <div key={resource.id} className="flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-300">{resource.title}</p>
                <p className="mt-1 text-sm text-slate-400">{resource.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">{resource.downloads} downloads</span>
                <a href={resource.downloadUrl} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white">Download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentDownloadsPage;
