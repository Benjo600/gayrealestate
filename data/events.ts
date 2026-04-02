export interface EventVenue {
    id: string;
    name: string;
    address: string;
    description: string;
    websiteUrl: string;
    category: 'Nightlife' | 'Entertainment' | 'Community' | 'Culture';
    tags: string[];
    image: string;
}

export const communityVenues: EventVenue[] = [
    {
        id: 'chez-est',
        name: 'Chez Est',
        address: '458 Wethersfield Avenue, Hartford, CT 06114',
        description: 'Connecticut\'s premiere LGBTQ+ destination for over 45 years. Known as "The House of Legends," Chez Est offers a vibrant mix of legendary drag performances, inclusive social events, and a welcoming atmosphere that defines the Hartford scene.',
        websiteUrl: 'https://chezest.com/events-calendar',
        category: 'Nightlife',
        tags: ['Drag Shows', 'Dancing', 'Community Hub', 'Legendary', 'Craft Cocktails'],
        image: '/images/events/chez-est.png'
    },
    {
        id: 'sky-casper',
        name: 'Sky Casper Entertainment',
        address: 'Various Locations, CT',
        description: 'The region\'s leading LGBTQ+ production company, bringing high-energy drag spectacles and inclusive social experiences to premium venues across Connecticut. From spectacular brunches to late-night extravaganzas.',
        websiteUrl: 'https://skycasper.com/events/',
        category: 'Entertainment',
        tags: ['Drag Spectacles', 'Luxury Events', 'Live Shows', 'Inclusive Entertainment'],
        image: '/images/events/sky-casper.png'
    }
];

export interface CommunityEvent {
    id: string;
    title: string;
    venueId: string;
    date: string;
    time?: string;
    description: string;
    link: string;
    featured?: boolean;
}

export const recentEvents: CommunityEvent[] = [
    {
        id: 'chez-legends',
        title: 'Monthly Legends Drag Revue',
        venueId: 'chez-est',
        date: 'First Saturday Monthly',
        time: '9:00 PM',
        description: 'Join the legendary House of Chez for a spectacular showcase of local and national drag excellence in a luxury setting.',
        link: 'https://chezest.com/events-calendar',
        featured: true
    },
    {
        id: 'sky-casper-brunch',
        title: 'Sky Casper Drag Brunches',
        venueId: 'sky-casper',
        date: 'Various Sundays',
        time: '11:30 AM',
        description: 'The ultimate Sunday experience. Gourmet dining paired with world-class performances in Connecticut\'s most beautiful venues.',
        link: 'https://skycasper.com/events/',
        featured: true
    },
    {
        id: 'chez-karaoke',
        title: 'Vocal Legends Karaoke',
        venueId: 'chez-est',
        date: 'Every Wednesday',
        time: '8:00 PM',
        description: 'The most inclusive and welcoming karaoke night in CT. Take the stage at the House of Legends.',
        link: 'https://chezest.com/events-calendar'
    }
];
