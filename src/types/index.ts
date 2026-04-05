export interface Socials {
    github?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
}

export interface Team {
    id: string;
    name: string;
}

export interface Member {
    id: string;
    name: string;
    type: string; // e.g., "Executive", "Patron", "Faculty Advisor"
    title?: string;
    department?: string;
    email: string;
    photo: string;
    year: number; // Student year or related year
    member_year?: number; // Graduation year for alumni
    teamId: string;
    socials?: Socials;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    status: 'upcoming' | 'past' | 'running';
    registration_link?: string;
    tags?: string[];
    gallery?: string[];
}

export interface TeamData {
    teams: Team[];
    members: Member[];
}

export interface EventData {
    events: Event[];
}
