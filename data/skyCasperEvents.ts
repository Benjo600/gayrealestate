/**
 * Sky Casper Entertainment — curated event feed for the partner spotlight page.
 * Source of truth for tickets/details remains https://skycasper.com/events/
 * Cover images downloaded from skycasper.com; ticket art generated via Imagine.
 */

export interface SkyCasperEvent {
  id: string;
  title: string;
  /** Short month label shown on the playbill date block, e.g. "AUG" */
  month: string;
  /** Day number for the playbill, e.g. "1" or "14" */
  day: string;
  /** Full date line for screen readers / detail text */
  dateLabel: string;
  timeLabel: string;
  venue: string;
  city: string;
  price?: string;
  category: 'Pride' | 'Drag Brunch' | 'Queer Night' | 'Special';
  blurb: string;
  /** Official event cover from skycasper.com (local cache) */
  image: string;
  /** Generated admission ticket visual (Imagine) */
  ticketImage: string;
  ticketUrl: string;
  featured?: boolean;
}

const ASSET = '/images/events/sky-casper';

export const skyCasperOrg = {
  name: 'Sky Casper Entertainment',
  tagline: 'Northeast LGBTQ+ Events Producer & Entertainment Agency',
  baseUrl: 'https://skycasper.com',
  eventsUrl: 'https://skycasper.com/events/',
  aboutUrl: 'https://skycasper.com/about/',
  dragBrunchUrl: 'https://skycasper.com/dragbrunchct/',
  comedyUrl: 'https://skycasper.com/lgbtq-comedy/',
  prideUrl: 'https://skycasper.com/pride-events/',
  email: 'hello@skycasper.com',
  phone: '(860) 407-8712',
  phoneTel: '+18604078712',
  location: 'West Hartford, Connecticut',
  instagram: 'https://www.instagram.com/SkyCasperEntertainment/',
  facebook: 'https://www.facebook.com/SkyCasperEntertainment',
};

export const skyCasperEvents: SkyCasperEvent[] = [
  {
    id: 'queer-beach-2026',
    title: 'Big Queer Beach Takeover',
    month: 'AUG',
    day: '1',
    dateLabel: 'Saturday, August 1, 2026',
    timeLabel: '9:30 AM – 5:00 PM',
    venue: 'Hammonasset Beach State Park',
    city: 'Madison, CT',
    category: 'Pride',
    blurb:
      'Third annual Queer Beach Takeover — sunshine, community, and Connecticut shoreline energy. Expect a full-day turnout and room to mix, mingle, and celebrate.',
    image: `${ASSET}/queer-beach-cover.png`,
    ticketImage: `${ASSET}/ticket-queer-beach.jpg`,
    ticketUrl: 'https://skycasper.com/event/sky-casper-big-queer-beach-takeover-gay-pride/',
    featured: true,
  },
  {
    id: 'game-ovah-aug',
    title: 'GAME OVAH!! Queer Night @ Spare Time',
    month: 'AUG',
    day: '14',
    dateLabel: 'Friday, August 14, 2026',
    timeLabel: '9:00 PM – 2:00 AM',
    venue: 'Spare Time Windsor Locks',
    city: 'Windsor Locks, CT',
    price: '$25',
    category: 'Queer Night',
    blurb:
      'Unlimited bowling & laser tag, music, and mingling — a queer-only night built for friends who want to play hard and stay out late.',
    image: `${ASSET}/game-ovah-aug-cover.jpg`,
    ticketImage: `${ASSET}/ticket-game-ovah-aug.jpg`,
    ticketUrl: 'https://skycasper.com/event/game-ovah-queer-night-spare-time-3/',
  },
  {
    id: 'marcia-loosey-brunch',
    title: 'Marcia x3 & Loosey LaDuca Dynamic Duo Drag Brunch',
    month: 'AUG',
    day: '23',
    dateLabel: 'Saturday, August 23, 2026',
    timeLabel: '11:00 AM – 4:30 PM',
    venue: 'The Social Bar + Kitchen',
    city: 'New London, CT',
    price: '$27 – $30',
    category: 'Drag Brunch',
    blurb:
      'RuPaul’s Drag Race superstars Marcia x3 and Loosey LaDuca headline Connecticut’s longest-running big-city drag brunch experience.',
    image: `${ASSET}/marcia-loosey-cover.png`,
    ticketImage: `${ASSET}/ticket-marcia-loosey.jpg`,
    ticketUrl: 'https://skycasper.com/event/marcia-x3-loosey-laduca-dinamic-duo-drag-brunch-new-london-ct/',
    featured: true,
  },
  {
    id: 'game-ovah-sep',
    title: 'GAME OVAH!! Queer Night @ Spare Time',
    month: 'SEP',
    day: '11',
    dateLabel: 'Friday, September 11, 2026',
    timeLabel: '9:00 PM – 2:00 AM',
    venue: 'Spare Time Windsor Locks',
    city: 'Windsor Locks, CT',
    price: '$25',
    category: 'Queer Night',
    blurb:
      'Another round of bowling, laser tag, music, and community — GAME OVAH returns for September’s queer night out.',
    image: `${ASSET}/game-ovah-sep-cover.jpg`,
    ticketImage: `${ASSET}/ticket-game-ovah-sep.jpg`,
    ticketUrl: 'https://skycasper.com/event/game-ovah-queer-night-spare-time-4/',
  },
  {
    id: 'pop-rb-brunch',
    title: 'Pop vs. R&B Pink Eggs & Glam Drag Brunch w/ Wesley',
    month: 'SEP',
    day: '27',
    dateLabel: 'Saturday, September 27, 2026',
    timeLabel: '11:00 AM – 4:30 PM',
    venue: 'The Social Bar + Kitchen',
    city: 'New London, CT',
    price: '$17 – $20',
    category: 'Drag Brunch',
    blurb:
      'A brunch that doesn’t just pay tribute to the divas — it becomes them. Pink Eggs & Glam with Wesley at The Social.',
    image: `${ASSET}/pop-rb-brunch-cover.jpg`,
    ticketImage: `${ASSET}/ticket-pop-rb.jpg`,
    ticketUrl: 'https://skycasper.com/event/pop-pink-eggs-glam-drag-brunch-new-london-ct/',
  },
  {
    id: 'halloween-brunch',
    title: 'Halloween Drag Brunch w/ Broadway Star Cacophony Daniels',
    month: 'OCT',
    day: '18',
    dateLabel: 'Saturday, October 18, 2026',
    timeLabel: '11:00 AM – 4:30 PM',
    venue: 'The Social Bar + Kitchen',
    city: 'New London, CT',
    price: '$17 – $20',
    category: 'Drag Brunch',
    blurb:
      'Broadway energy meets Halloween glam — expected to be one of Connecticut’s most show-stopping brunch experiences of the season.',
    image: `${ASSET}/halloween-brunch-cover.png`,
    ticketImage: `${ASSET}/ticket-halloween-event.jpg`,
    ticketUrl: 'https://skycasper.com/event/halloween-drag-brunch-broadway-new-london-ct/',
  },
  {
    id: 'parental-advisory-brunch',
    title: 'Parental Advisory Warning Drag Brunch w/ Pissi Myles',
    month: 'NOV',
    day: '15',
    dateLabel: 'Saturday, November 15, 2026',
    timeLabel: '11:00 AM – 4:30 PM',
    venue: 'The Social Bar + Kitchen',
    city: 'New London, CT',
    price: '$17 – $20',
    category: 'Drag Brunch',
    blurb:
      'Gloriously, unapologetically not for everyone — a late-year brunch for adults who like their drag loud and unfiltered.',
    image: `${ASSET}/parental-advisory-cover.jpg`,
    ticketImage: `${ASSET}/ticket-parental.jpg`,
    ticketUrl: 'https://skycasper.com/event/parental-advisory-drag-brunch-new-london/',
  },
  {
    id: 'christmas-brunch',
    title: 'Christmas Pink Eggs & Glam Drag Brunch w/ Blacc Cherry',
    month: 'DEC',
    day: '13',
    dateLabel: 'Saturday, December 13, 2026',
    timeLabel: '11:00 AM – 4:30 PM',
    venue: 'The Social Bar + Kitchen',
    city: 'New London, CT',
    price: '$17 – $20',
    category: 'Drag Brunch',
    blurb:
      'A Very Cherry Christmas — Pink Eggs & Glam starring NYC’s rising drag superstar Blacc Cherry for a festive New London finale.',
    image: `${ASSET}/christmas-brunch-cover.png`,
    ticketImage: `${ASSET}/ticket-christmas-event.jpg`,
    ticketUrl: 'https://skycasper.com/event/christmas-pink-eggs-drag-brunch-new-london-ct/',
  },
];

export const skyCasperPillars = [
  {
    title: 'Drag Brunches',
    description:
      'Connecticut’s signature weekend tables — gourmet plates, high-glam stages, and guest stars from RuPaul’s Drag Race and Broadway.',
    href: skyCasperOrg.dragBrunchUrl,
  },
  {
    title: 'Queer Nights Out',
    description:
      'Bowling, laser tag, late music, and spaces built for LGBTQ+ crowds who want more than a standard nightclub lineup.',
    href: skyCasperOrg.eventsUrl,
  },
  {
    title: 'Pride & Beach Days',
    description:
      'Outdoor takeovers and Pride-season gatherings that put community first — sunshine, shoreline, and room to belong.',
    href: skyCasperOrg.prideUrl,
  },
  {
    title: 'Private & Corporate',
    description:
      'Custom productions for universities, brands, and private celebrations across the Northeast.',
    href: 'https://skycasper.com/custom-events/',
  },
] as const;
