import { useState, useEffect } from 'react';
import { SubscriberManager } from '../utils/subscriberManager';
import type { Subscriber } from '../utils/subscriberManager';

const SubscriberAdmin = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [stats, setStats] = useState<any>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSubscribers(SubscriberManager.getAllSubscribers());
        setStats(SubscriberManager.getStats());
    };

    const handleExport = () => {
        SubscriberManager.exportData();
    };

    const handleRemove = (email: string) => {
        if (window.confirm(`Remove ${email} from subscribers?`)) {
            SubscriberManager.removeSubscriber(email);
            loadData();
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear ALL subscribers? This cannot be undone!')) {
            SubscriberManager.clearAll();
            loadData();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">CCRC IT Club - Subscriber Management</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.total || 0}</div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">Total Subscribers</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.last7Days || 0}</div>
                    <div className="text-sm text-green-800 dark:text-green-200">Last 7 Days</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.last30Days || 0}</div>
                    <div className="text-sm text-purple-800 dark:text-purple-200">Last 30 Days</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{Object.keys(stats.sources || {}).length}</div>
                    <div className="text-sm text-orange-800 dark:text-orange-200">Sources</div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={handleExport}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Export Data
                </button>
                <button
                    onClick={loadData}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                    Refresh
                </button>
                <button
                    onClick={handleClearAll}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Clear All
                </button>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Source</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Subscribed</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                        {subscribers.map((subscriber, index) => (
                            <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                <td className="px-4 py-3 text-sm">{subscriber.email}</td>
                                <td className="px-4 py-3 text-sm capitalize">{subscriber.source}</td>
                                <td className="px-4 py-3 text-sm">
                                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <button
                                        onClick={() => handleRemove(subscriber.email)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                                    No subscribers yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Usage Instructions */}
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="font-bold mb-2">How to access this admin panel:</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    To view subscriber data, you can:
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 mt-2 list-disc list-inside">
                    <li>Open browser console and run: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">SubscriberManager.getAllSubscribers()</code></li>
                    <li>Run: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">SubscriberManager.exportData()</code> to download JSON file</li>
                    <li>Run: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">SubscriberManager.getStats()</code> for statistics</li>
                </ul>
            </div>
        </div>
    );
};

export default SubscriberAdmin;