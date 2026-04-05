import { memo, useState, type KeyboardEvent } from 'react';
import Users from 'lucide-react/dist/esm/icons/users';
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap';
import X from 'lucide-react/dist/esm/icons/x';
import type { Member } from '../types';

interface GraduatesCardProps {
    members: Member[];
}

const GraduatesCard: React.FC<GraduatesCardProps> = ({ members }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal();
        }
    };

    return (
        <>
            {/* Graduates Card */}
            <div
                role="button"
                tabIndex={0}
                onClick={openModal}
                onKeyDown={handleKeyDown}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-cyan-200 dark:border-cyan-500/30 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-none hover:border-cyan-500/50 cursor-pointer"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

                {/* Content */}
                <div className="relative p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                        <GraduationCap className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Our Graduates
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Meet the alumni who started their journey with CCRC IT Club
                    </p>

                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium">
                        <Users className="w-4 h-4" />
                        <span>{members.length} Graduates</span>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Our Graduates
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Alumni who contributed to building CCRC IT Club
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-cyan-500/20"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMxZTJmNGIiLz4KPHBhdGggZD0iTTQwIDIwQzQ0LjQxODMgMjAgNDggMjQuNDE4MyA0OCAzMEM0OCA0NC40MTgzIDQ0LjQxODMgNDggNDAgNDhDNDUuNTgxNyA0OCA0MiA0NC40MTgzIDQyIDQwQzQyIDM1LjU4MTcgMzUuNTgxNyAzMiAzMCAzMkMzNS41ODE3IDMyIDQyIDI1LjU4MTcgNDIgMjBaIiBmaWxsPSIjOWNhM2FmIi8+CjxwYXRoIGQ9Ik0yMCA1Nkg2MEM2MCA2MCA2MCA2MCA2MCA2MFoiIGZpbGw9IiM5Y2EzYWYiLz4KPC9zdmc+Cg==';
                                                }}
                                            />
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                Class of {member.member_year}
                                            </p>
                                            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                                                {member.type}
                                            </p>
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 mt-2"
                                                >
                                                    {member.email}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(GraduatesCard);