export const SITE_CONFIG = {
    name: "IT CLUB (CCRC)",
    fullName: "IT CLUB (CCRC)",
    url: "https://ccrc.edu.np",
    description: "IT CLUB at Capital College and Research Center - Innovate. Connect. Transform",
    logo: "https://ccrc.edu.np/favicon/favicon.ico",
    email: "itclub@ccrc.edu.np",
    foundingDate: "2011",
    location: {
        country: "NP",
        region: "Bagmati",
        city: "Lalitpur",
        coordinates: {
            latitude: "27.671419683136147",
            longitude: " 85.33875975286703"
        }
    },
    social: {
        facebook: "https://www.facebook.com/ccrcinfotechclub",
        instagram: "https://www.instagram.com/ccrc.it.club/",
        discord: "https://discord.gg/ymyWAv3RFA",
    }
};

export const SEO_PAGES = {
    home: {
        title: "IT CLUB|Tech Community at CCRC",
        description: "Join CCRC IT CLUB Innovation & Tech Club) - the premier tech community at Capital College and Research Center (CCRC). Discover workshops, events, hackathons, and networking opportunities for aspiring tech enthusiasts.",
        keywords: "CCRC, computer club,ccrc club,ccrc tech club,ccrc tech community, IT club, tech community, CCRC, Nepal College, workshops, hackathons, tech events, programming, coding club",
        ogImage: "/media/og-team.avif",
        path: "/"
    },
    team: {
        title: "Our Team - IT CLUB | Meet the Club Leaders",
        description: "Meet the passionate team members of Computer Science Innovation & Tech Club (CCRC) - Executive Committee, Mentors, Faculty Advisors, and Patron driving innovation and tech education.",
        keywords: "CCRC team, computer club, tech club members, CCRC tech community, student tech leaders, executive committee",
        ogImage: "/media/og-team.avif",
        path: "/team"
    },
    events: {
        title: "Events & Workshops - CCRC | Tech Events at CCRC",
        description: "Explore upcoming tech events and workshops at CCRC. Join hackathons, coding competitions, seminars, and networking sessions to enhance your tech skills.",
        keywords: "tech events, workshops, hackathons, coding competitions, tech seminars, CCRC events, CCRC tech community",
        ogImage: "/media/og-team.avif",
        path: "/events"
    },
    join: {
        title: "Join CCRC IT CLUB - Club Membership Registration",
        description: "Reserve your spot and join CCRC IT CLUB (Computer Innovation & Tech Club) at CCRC. Fill out our membership form to become part of our thriving tech community and access exclusive workshops, events, and networking opportunities.",
        keywords: "join CCRC IT CLUB, club membership, CCRC IT CLUB registration, tech club join, CCRC tech community membership, student club registration",
        ogImage: "/media/og-team.avif",
        path: "/join"
    }
} as const;

export const getPageSEO = (page: keyof typeof SEO_PAGES) => {
    const pageData = SEO_PAGES[page];
    const baseUrl = SITE_CONFIG.url;

    return {
        ...pageData,
        url: `${baseUrl}${pageData.path}`,
        siteName: SITE_CONFIG.name,
        author: SITE_CONFIG.fullName,
    };
};

export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.fullName,
    "alternateName": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": SITE_CONFIG.logo,
    "description": SITE_CONFIG.description,
    "foundingDate": SITE_CONFIG.foundingDate,
    "address": {
        "@type": "PostalAddress",
        "addressCountry": SITE_CONFIG.location.country,
        "addressLocality": SITE_CONFIG.location.city
    },
    "sameAs": Object.values(SITE_CONFIG.social)
});

export const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
});

export const getPersonSchema = (member: {
    name: string;
    email: string;
    photo?: string;
    title?: string;
    department?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        twitter?: string;
        website?: string;
    };
}, includeContext = true) => ({
    ...(includeContext && { "@context": "https://schema.org" }),
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/team#${member.name.toLowerCase().replace(/\s+/g, '-')}`,
    "name": member.name,
    "email": member.email,
    "url": `${SITE_CONFIG.url}/team`,
    ...(member.photo && { "image": member.photo }),
    ...(member.title && { "jobTitle": member.title }),
    "affiliation": {
        "@type": "Organization",
        "name": SITE_CONFIG.fullName,
        "url": SITE_CONFIG.url
    },
    "worksFor": {
        "@type": "Organization",
        "name": SITE_CONFIG.fullName,
        "url": SITE_CONFIG.url
    },
    "sameAs": [
        ...(member.socials?.github ? [member.socials.github] : []),
        ...(member.socials?.linkedin ? [member.socials.linkedin] : []),
        ...(member.socials?.instagram ? [member.socials.instagram] : []),
        ...(member.socials?.facebook ? [member.socials.facebook] : []),
        ...(member.socials?.twitter ? [member.socials.twitter] : []),
        ...(member.socials?.website ? [member.socials.website] : [])
    ].filter(Boolean)
});

export const getTeamSchema = (members: any[]) => ({
    "@context": "https://schema.org",
    "@graph": [
        getOrganizationSchema(),
        ...members.map(member => getPersonSchema(member, false))
    ]
});

export const getEventSchema = (event: {
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    status: string;
    registration_link?: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "image": event.image,
    "startDate": event.date,
    "startTime": event.time,
    "location": {
        "@type": "Place",
        "name": event.location,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": SITE_CONFIG.location.country
        }
    },
    "eventStatus": event.status === 'running' || event.status === 'upcoming'
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventPostponed",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "organizer": {
        "@type": "Organization",
        "name": SITE_CONFIG.fullName,
        "url": SITE_CONFIG.url
    },
    ...(event.registration_link && {
        "offers": {
            "@type": "Offer",
            "url": event.registration_link,
            "price": "0",
            "priceCurrency": "NPR",
            "availability": "https://schema.org/InStock",
            "validFrom": event.date
        }
    })
});

export const getMetaTags = (config: {
    title: string;
    description: string;
    url: string;
    image: string;
    keywords: string;
    type?: string;
}) => ({
    title: config.title,
    meta: {
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        author: SITE_CONFIG.fullName,
        robots: "index, follow",
    },
    og: {
        type: config.type || "website",
        url: config.url,
        title: config.title,
        description: config.description,
        image: config.image,
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        card: "summary_large_image",
        url: config.url,
        title: config.title,
        description: config.description,
        image: config.image,
    }
});
