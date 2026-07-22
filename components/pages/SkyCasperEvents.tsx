import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MapPin, ArrowRight, Ticket, Calendar } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import {
  skyCasperEvents,
  skyCasperOrg,
  type SkyCasperEvent,
} from '../../data/skyCasperEvents';

/**
 * Compact mobile-first Sky Casper page.
 * Simple sans type only · small ticket thumbs · dark stage palette.
 */

const BASE_URL = 'https://www.gayrealestatect.net';

function categoryStamp(cat: SkyCasperEvent['category']): string {
  switch (cat) {
    case 'Drag Brunch':
      return 'Brunch';
    case 'Queer Night':
      return 'Night out';
    case 'Pride':
      return 'Pride';
    default:
      return 'Special';
  }
}

const TicketCard: React.FC<{
  event: SkyCasperEvent;
  featured?: boolean;
}> = ({ event, featured = false }) => {
  return (
    <a
      href={event.ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden transition-colors hover:border-pink-400/40 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 ${
        featured ? 'border-pink-400/25 bg-white/[0.06]' : ''
      }`}
      aria-label={`${event.title}. ${event.dateLabel}. Get tickets.`}
    >
      {/* Ticket image — readable size, not full-bleed banner */}
      <div
        className={`relative w-full overflow-hidden bg-[#1a0b2e] ${
          featured ? 'aspect-[16/10] max-h-52 sm:max-h-60' : 'aspect-[16/9] max-h-40 sm:max-h-48'
        }`}
      >
        <img
          src={event.ticketImage}
          alt=""
          width={640}
          height={360}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold leading-none text-white">
          <span className="text-pink-300">{event.month}</span>
          <span>{event.day}</span>
        </div>
        <span className="absolute top-2 right-2 rounded-md border border-pink-400/40 bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-300">
          {categoryStamp(event.category)}
        </span>
      </div>

      {/* Text row */}
      <div className="flex gap-3 p-3 sm:p-3.5">
        <div className="hidden sm:block shrink-0 w-14 h-14 rounded-md overflow-hidden border border-white/10">
          <img
            src={event.image}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-[15px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-pink-100 transition-colors">
              {event.title}
            </h3>
            {event.price && (
              <span className="shrink-0 text-xs font-semibold text-amber-300/90 pt-0.5">
                {event.price}
              </span>
            )}
          </div>

          <p className="flex items-center gap-1 text-xs text-white/50">
            <MapPin className="w-3 h-3 text-pink-400 shrink-0" aria-hidden />
            <span className="truncate">
              {event.venue}, {event.city}
            </span>
          </p>

          <p className="mt-0.5 flex items-center gap-1 text-xs text-white/60">
            <Calendar className="w-3 h-3 text-violet-300 shrink-0" aria-hidden />
            <span className="truncate">
              {event.dateLabel.replace(/, 2026$/, '')} · {event.timeLabel}
            </span>
          </p>

          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-pink-300">
            Get tickets
            <ExternalLink className="w-3 h-3" aria-hidden />
          </span>
        </div>
      </div>
    </a>
  );
};

const SkyCasperEvents: React.FC = () => {
  const nextUp = useMemo(
    () => skyCasperEvents.find((e) => e.featured) ?? skyCasperEvents[0],
    []
  );
  const rest = useMemo(
    () => skyCasperEvents.filter((e) => e.id !== nextUp.id),
    [nextUp]
  );

  const eventSchemas = skyCasperEvents.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.blurb,
    startDate: event.dateLabel,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: event.image,
    url: event.ticketUrl,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city.replace(', CT', ''),
        addressRegion: 'CT',
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: skyCasperOrg.name,
      url: skyCasperOrg.baseUrl,
      telephone: skyCasperOrg.phone,
    },
    audience: { '@type': 'Audience', audienceType: 'LGBTQ+ Community' },
  }));

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Sky Casper Events in Connecticut',
      description:
        'Drag brunches, queer nights, and Pride events produced by Sky Casper Entertainment — highlighted for the LGBTQ+ community in Connecticut.',
      url: `${BASE_URL}/sky-casper`,
      about: {
        '@type': 'EntertainmentBusiness',
        name: skyCasperOrg.name,
        url: skyCasperOrg.baseUrl,
        telephone: skyCasperOrg.phone,
        email: skyCasperOrg.email,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Community Hub',
          item: `${BASE_URL}/community`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Sky Casper Events',
          item: `${BASE_URL}/sky-casper`,
        },
      ],
    },
    ...eventSchemas,
  ];

  return (
    <div className="min-h-screen bg-[#0c0614] font-sans text-white relative overflow-x-hidden antialiased">
      <SEOHead
        title="Sky Casper Events | Drag Brunches & LGBTQ+ Nightlife in CT"
        description="Explore upcoming Sky Casper Entertainment events across Connecticut — drag brunches, queer nights, beach takeovers, and Pride season shows. Tickets via skycasper.com."
        canonical={`${BASE_URL}/sky-casper`}
        ogImage={`${BASE_URL}/images/events/sky-casper/ticket-queer-beach.jpg`}
        ogImageAlt="Sky Casper Entertainment LGBTQ+ events in Connecticut"
        keywords="Sky Casper events, drag brunch Connecticut, LGBTQ events CT, queer nightlife Connecticut, New London drag brunch, Hammonasset queer beach"
        structuredData={structuredData}
      />

      <div className="fixed inset-0 z-0 bg-[#0c0614]" aria-hidden />
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(236,72,153,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(139,92,246,0.16),transparent_45%)]" />
      </div>

      <Header />

      <main className="relative z-10 px-4 sm:px-5 pb-16 sm:pb-24">
        {/* Hero — compact on mobile */}
        <section className="pt-24 sm:pt-28 md:pt-32 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-[10px] font-semibold uppercase tracking-wide text-pink-300 mb-3">
            <Ticket className="w-3 h-3" aria-hidden />
            Partner spotlight
          </div>

          <p className="text-xs sm:text-sm text-pink-300/80 mb-2">
            Sky Casper Entertainment · CT
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3">
            Keep the ticket.
            <br />
            <span className="text-pink-300">Make the table.</span>
          </h1>

          <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed mb-5 max-w-md">
            Drag brunches, queer nights, and Pride days across Connecticut.
            Tickets on{' '}
            <span className="text-white/90 font-medium">skycasper.com</span>.
          </p>

          <div className="flex flex-col xs:flex-row flex-wrap gap-2 mb-8">
            <a
              href={skyCasperOrg.eventsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold transition-colors"
            >
              Full calendar
              <ExternalLink className="w-3.5 h-3.5 opacity-90" aria-hidden />
            </a>
            <a
              href="#season"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
            >
              Browse events
            </a>
            <Link
              to="/community"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Community Hub
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </Link>
          </div>

          {/* Featured — same compact card style */}
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
            Up next
          </p>
          <TicketCard event={nextUp} featured />
        </section>

        {/* Season list */}
        <section id="season" className="max-w-2xl mx-auto mt-10 sm:mt-12 scroll-mt-20">
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-300/90 mb-1">
              Season
            </p>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
              On the calendar
            </h2>
            <p className="text-xs sm:text-sm text-white/45 mt-1">
              Opens the official Sky Casper page for tickets.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {rest.map((event) => (
              <TicketCard key={event.id} event={event} />
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-white/40 leading-relaxed px-2">
            Dates and prices can change. Confirm on the official calendar before
            you go.
          </p>
          <div className="mt-2 flex justify-center">
            <a
              href={skyCasperOrg.eventsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-pink-300 hover:text-pink-200"
            >
              skycasper.com/events
              <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        </section>

        {/* Bridge — compact */}
        <section className="max-w-2xl mx-auto mt-10 sm:mt-14">
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-fuchsia-900/40 via-violet-950/80 to-[#0c0614] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/90 mb-2">
              Why we feature this
            </p>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-2">
              Looking for a town with a{' '}
              <span className="text-pink-300">scene</span>?
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Schools, taxes, commute — and where brunch actually happens. Sky
              Casper is part of that answer for Connecticut.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold transition-colors"
              >
                Talk with a realtor
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Community Hub
              </Link>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                Sky Casper
              </p>
              <a
                href={`mailto:${skyCasperOrg.email}`}
                className="block text-white/75 hover:text-white break-all"
              >
                {skyCasperOrg.email}
              </a>
              <a
                href={`tel:${skyCasperOrg.phoneTel}`}
                className="block text-white/75 hover:text-white"
              >
                {skyCasperOrg.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SkyCasperEvents;
