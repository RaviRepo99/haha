import { memo, useState } from 'react';
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Mail from 'lucide-react/dist/esm/icons/mail';
import User from 'lucide-react/dist/esm/icons/user';
import Globe from 'lucide-react/dist/esm/icons/globe';
import type { Member } from '../types';
import { getPersonSchema } from '../config/seoData';

interface MemberCardProps {
    member: Member;
    priority?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const website = member.socials?.website?.trim();
    const normalizedWebsiteUrl = website
        ? website.startsWith('http://') || website.startsWith('https://')
            ? website
            : `https://${website}`
        : '';

    const isWebsiteValid = (url?: string) => {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const websiteValid = isWebsiteValid(normalizedWebsiteUrl);

    // Generate Person schema for SEO using centralized function
    const personSchema = getPersonSchema(member);

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Person Schema for SEO */}
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            {/* Image Container with aspect ratio */}
            <div className={`relative aspect-[3/4] overflow-hidden ${!isLoaded && member.photo ? 'animate-pulse bg-cyan-500/10' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {member.photo ? (
                    <>
                        {/* Hero-style Placeholder/Glow */}
                        {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                            </div>
                        )}
                        <img
                            src={member.photo}
                            alt={member.name}
                            onLoad={() => setIsLoaded(true)}
                            loading={priority ? "eager" : "lazy"}
                            fetchPriority={priority ? "high" : "auto"}
                            className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800">
                        <User className="w-24 h-24 text-slate-400 dark:text-slate-500" />
                    </div>
                )}

                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Social Links Overlay - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-3">
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-125 shadow-lg"
                                title="Email"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        )}

                        {member.socials?.github && (
                            <a
                                href={member.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 hover:scale-125 shadow-lg"
                                title="GitHub"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}

                        {member.socials?.linkedin && (
                            <a
                                href={member.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-125 shadow-lg"
                                title="LinkedIn"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}

                        {member.socials?.instagram && (
                            <a
                                href={member.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-125 shadow-lg"
                                title="Instagram"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}

                        {websiteValid && member.socials?.website && (
                            <a
                                href={normalizedWebsiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 hover:scale-125 shadow-lg"
                                title="Website"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Globe className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Name and Title at bottom - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {member.name}
                    </h3>
                    <p className="text-sm md:text-base text-cyan-300 font-medium drop-shadow-md">
                        {member.title || (member.department ? member.department : `${member.type}`)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(MemberCard);
