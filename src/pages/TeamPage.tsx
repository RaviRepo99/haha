import { useState, useEffect } from 'react';
import MemberCard from '../components/MemberCard';
import GraduatesCard from '../components/GraduatesCard';
import type { TeamData } from '../types';
import { getPageSEO, getMetaTags, getTeamSchema } from '../config/seoData';

const TeamPage = () => {
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(true);

    const seoData = getPageSEO('team');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : seoData.url;
    const metaTags = getMetaTags({
        title: seoData.title!,
        description: seoData.description!,
        url: pageUrl,
        image: seoData.ogImage!,
        keywords: seoData.keywords,
    });

    useEffect(() => {
        fetch('/data/teams.json')
            .then((res) => res.json())
            .then((data) => {
                setTeamData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching team data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-40 flex items-center justify-center bg-[#0f172a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!teamData) {
        return (
            <div className="min-h-screen pt-40 text-center text-white bg-[#0f172a]">
                Failed to load team data.
            </div>
        );
    }

    // Helper to get members of a team, sorted by college year (descending) and name
    const getTeamMembers = (teamId: string) => {
        const filtered = teamData.members.filter(m => m.teamId === teamId);
        if (teamId === 't_exec_2025' || teamId === 't_graduates') {
            // For BOD and Graduates, keep the order as in the data (custom order)
            return filtered;
        }
        return filtered.sort((a, b) => {
            // Sort by name
            return a.name.localeCompare(b.name);
        });
    };

    // Generate Team/Organization schema with all team members using @graph
    const teamSchema = teamData ? getTeamSchema(teamData.members) : null;

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{metaTags.title}</title>
            <meta name="title" content={metaTags.meta.title} />
            <meta name="description" content={metaTags.meta.description} />
            <link rel="canonical" href={pageUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={metaTags.og.type} />
            <meta property="og:url" content={metaTags.og.url} />
            <meta property="og:title" content={metaTags.og.title} />
            <meta property="og:description" content={metaTags.og.description} />
            <meta property="og:image" content={metaTags.og.image} />
            <meta property="og:site_name" content={metaTags.og.siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content={metaTags.twitter.card} />
            <meta name="twitter:url" content={metaTags.twitter.url} />
            <meta name="twitter:title" content={metaTags.twitter.title} />
            <meta name="twitter:description" content={metaTags.twitter.description} />
            <meta name="twitter:image" content={metaTags.twitter.image} />

            {/* Additional SEO */}
            <meta name="keywords" content={metaTags.meta.keywords} />
            <meta name="author" content={metaTags.meta.author} />
            <meta name="robots" content={metaTags.meta.robots} />

            <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-colors duration-300">
                {/* Team Schema */}
                {teamSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(teamSchema)}
                    </script>
                )}

                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-200 mb-6">
                            Meet the Team
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                            The passionate individuals behind CCRC who work tirelessly to bring you the best tech events and workshops.
                        </p>
                    </div>

                    {/* Team Sections */}
                    <div className="space-y-24">
                        {teamData.teams.map((team) => {
                            const members = getTeamMembers(team.id);
                            if (members.length === 0) return null;

                            // Special handling for graduates - show as a single clickable card
                            if (team.id === 't_graduates') {
                                return (
                                    <section key={team.id} id={team.id} className="scroll-mt-28">
                                        {/* Section Title */}
                                        <div className="flex items-center gap-4 mb-12">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-500/30" />
                                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center min-w-max px-4">
                                                {team.name}
                                            </h2>
                                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 via-cyan-500/30 to-transparent" />
                                        </div>

                                        {/* Graduates Card */}
                                        <div className="max-w-md mx-auto">
                                            <GraduatesCard members={members} />
                                        </div>
                                    </section>
                                );
                            }

                            // Check if this is a small team (Patrons, Faculty, Mentors) - center them
                            const isSmallTeam = members.length <= 4;

                            return (
                                <section key={team.id} id={team.id} className="scroll-mt-28">
                                    {/* Section Title */}
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-500/30" />
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center min-w-max px-4">
                                            {team.name}
                                        </h2>
                                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 via-cyan-500/30 to-transparent" />
                                    </div>

                                    {/* Members Grid */}
                                    <div className={`
                                        grid gap-8
                                        ${isSmallTeam
                                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                        }
                                    `}>
                                        {members.map((member, idx) => (
                                            <MemberCard
                                                key={member.id}
                                                member={member}
                                                priority={team.id === 't_patron' || (team.id === 't_mentors_2025' && idx === 0)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamPage;
