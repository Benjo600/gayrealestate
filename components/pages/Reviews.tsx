import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Users, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import { BookTestimonial } from '../ui/3d-book-testimonial';

/* ──────────────────────────────────────────────
   CONDENSED REVIEW DATA
   ────────────────────────────────────────────── */

interface Review {
    text: string;
    author: string;
    location: string;
}

const arekReviews: Review[] = [
    {
        text: "A true advocate — I knew he was on my side through the whole process. Extraordinary polite, patient, and an incredible realtor.",
        author: "Dylan S.",
        location: "New Haven, CT"
    },
    {
        text: "Kind, attentive, and always working for our needs in the sale of our property.",
        author: "Paige G.",
        location: "Hamden, CT"
    },
    {
        text: "Professional, efficient, and enjoyable to work with. He turned what could have been stressful into something fulfilling and positive.",
        author: "Jack Z.",
        location: "Wethersfield, CT"
    },
    {
        text: "As first-time homeowners, Arek was a wealth of knowledge. He navigated us through showings, mortgage approvals, and inspections seamlessly.",
        author: "Thomas N.",
        location: "Glastonbury, CT"
    },
    {
        text: "If you want to sell, contact Arek — he will do everything possible to promote and sell your home. Terrific person to work with.",
        author: "Janet & David J.",
        location: "Kensington, CT"
    },
    {
        text: "An excellent communicator and advocate. He put in extra hours to find me the perfect place — even my attorney commented on how amazing he was.",
        author: "Erin S.",
        location: "New Britain, CT"
    },
    {
        text: "Especially helpful with answering questions and making the home-buying process as user-friendly as possible.",
        author: "Evan B.",
        location: "Berlin, CT"
    },
    {
        text: "I really don't care what agency I use as long as Arek is my agent.",
        author: "Monique L.",
        location: "Cromwell, CT"
    },
    {
        text: "Amazing! Very calm and understands the market.",
        author: "Izabela K.",
        location: "Cromwell, CT"
    }
];

const jakeReviews: Review[] = [
    {
        text: "Answers the phone EVERY time I call, immense knowledge, and always steers me in the right direction. This is my second time working with him.",
        author: "Charles I.",
        location: "Hartford, CT"
    },
    {
        text: "Mortgage commitment completed weeks early. Very seamless process. This is my 3rd mortgage with Jake and I will continue to use him.",
        author: "Thomas L.",
        location: "West Hartford, CT"
    },
    {
        text: "For anyone looking for an honest, engaged, and customer-oriented lender — look no further than Jake Earl. He explained every detail.",
        author: "Rohan",
        location: "Hartford, CT"
    },
    {
        text: "Responsive to texts, calls, and emails even on weekends. He knows his job well, goes above and beyond.",
        author: "First-Time Buyer",
        location: "New Britain, CT"
    }
];

const abbyReviews: Review[] = [
    {
        text: "Abby was an absolute dream of a realtor! I contacted her over a year ago when we were starting our home search. She was super responsive, supportive and helpful with the process of buying a new home. Our process got delayed a year, and when I reached back out Abby picked up right where we left off. She helped connect us with options for lenders and attorneys, always guiding the process while allowing us choices. Abby was SO patient with our nerves about home ownership and looking for just the right home. She worked quickly to set up showings for us, gathered information about the houses we viewed and helped us think through our decisions. We landed in our dream home much quicker than we thought we could, thanks to Abby’s diligence and expertise. I would recommend her to anyone in the area looking for a trusted, diligent, fun, encouraging realtor who they can rely on for such an important process! Abby’s the best!",
        author: "Katy H.",
        location: "Connecticut"
    },
    {
        text: "We can’t say enough great things about Abby—she was an absolute lifesaver in helping us find our home while relocating from another state. Navigating a competitive market is hard enough, but doing it remotely adds an entirely different level of stress. Thankfully, Abby made it feel manageable—and even exciting. From the start, she was incredibly responsive, thoughtful, and proactive. She took the time to understand exactly what we were looking for and consistently sent us listings that aligned with our needs and budget. She went above and beyond to accommodate our schedule and location, including virtual tours and thorough walkthroughs that made us feel like we were right there with her. What truly set Abby apart was how much we trusted her judgment. She made smart, honest recommendations, explained every step of the process clearly, and advocated for us at every juncture. And as the process went on, she became more than just our agent—she became our friend. We feel incredibly lucky to have worked with Abby and wouldn’t hesitate to recommend her to anyone looking for a dedicated, knowledgeable, and genuinely caring real estate partner. She helped us find more than just a house—she helped us find home.",
        author: "Mindy M.",
        location: "Connecticut"
    },
    {
        text: "Since pre-pandemic my wife and I have been looking for a second home in New England. We began working with Abby about a year ago. We were sure we knew what we wanted and had a great deal of difficulty finding that. Abby helped us expand our vision and find our home. She never pressured us but showed us homes we were sure weren't the one. Turns out she was right about a home we overlooked. In addition, Abby's help and guidance throughout the process was necessary as we were out of state buyers. Thank you Abby for being there throughout the process always answering our questions or helping us find a resource. We are very grateful.",
        author: "Terri G.",
        location: "Connecticut"
    },
    {
        text: "I can’t say enough positive things about Abby and how much she helped me through the home buying process. Abby is quick, efficient, knowledgeable and detail oriented. Beyond her real estate expertise Abby’s demeanor helped me feel calmer through a stressful experience and I trusted her to help lead me down the path of being a first time home buyer. Thank you Abby!",
        author: "Melissa G.",
        location: "Connecticut"
    },
    {
        text: "Abby was outstanding with helping us find our forever home! She was transparent with listing prices vs. actual value of the homes we looked at. She never once pushed us towards a house that didn't fit our needs, and she remained optimistic throughout the entire process. She's a buyers dream, especially when the house is overpriced for the market. She tackled the difficult conversations with the selling agent and held to our bottom line with non negotiables. Abby rocks and I highly recommend using her for your buying or selling needs!",
        author: "Maranda C.",
        location: "Connecticut"
    },
    {
        text: "This was a first time home purchase for my husband and I and to say that we were like deer in a headlight would be an extreme understatement. We met Abby while we were touring a home randomly, we hadn’t even committed to buying yet. We were expecting our first child and we wanted to get an idea of what to expect. She answered all of our questions, no matter how silly. She guided us through this whole process, explained the market in a way that helped us understand it and connected us with some great resources and referrals. We wouldn’t be home owners without her. If I ever had a question, I knew that Abby would respond immediately. If I was ever having a breakdown through the underwriting/closing process, she would calm my fears. She was a fierce advocate for us, the buyers. I would highly recommend her to anyone who is purchasing for the first time and would appreciate a great source of information to help guide them.",
        author: "Nazly B.",
        location: "Connecticut"
    },
    {
        text: "As a first time renter, my partner and I were blown away with how helpful and efficient Abby was. We were able to communicate through group chat which made the process seamless, especially because my busy schedule did not allow regular phone calls or face to face meetings. She went above and beyond, even going to properties to give us a virtual tour in order to spare us the 3.5 hour drive. If you want to find your dream apartment/house, you need to enlist Abby Dudarewicz!!!",
        author: "Shawn H.",
        location: "Connecticut"
    },
    {
        text: "We met Abby @ an Open House. I decided to reach out to her due to the previous realtor we were working with kinda dropped the ball.. We spoke on the phone and I let her know what we were looking for & what we wanted. Abby was absolutely amazing throughout the entire process. We live in NY so it was somewhat difficult to always go to see a listing so she would go to do videos & send all info needed. She is very patient & extremly helpful. We loved working with her she truly made this experience alot smoother than it would had been. She delivers!",
        author: "Daisy L.",
        location: "Connecticut"
    }
];

const carolynReviews: Review[] = [
    {
        text: "I couldn’t be more impressed with Carolyn’s professionalism and expertise. From start to finish, she makes the entire process smooth and stress-free. Her attention to detail, clear communication, and ability to navigate complex legal matters is outstanding. I highly recommend Carolyn to anyone in need of a top-notch real estate attorney!",
        author: "Hayden A.",
        location: "Connecticut"
    },
    {
        text: "Carolyn is my go to attorney for my clients and friends. Her team is great at what they do and always put in 100%.",
        author: "Kathleen M.",
        location: "Connecticut"
    },
    {
        text: "I had an excellent experience with MPF law. The staff is Kind and caring. Everyone is very knowledgeable and quick to make sure your questions are answered. I am beyond grateful. Thanks",
        author: "Matthew S.",
        location: "Connecticut"
    },
    {
        text: "I had an excellent experience with this team before. I had a seamless experience purchasing a property in 2019. Now that I'm selling, I'm using them again. Terri, the paralegal, is stellar. She's extremely responsive and escalates any concern I may have through the appropriate channels. Through the first transaction, I only needed to communicate with the attorney at the closing table as Terri handled everything else I needed. Bonus: the office in Southington is beautiful. :)",
        author: "Cody B.",
        location: "Connecticut"
    }
];

/* ──────────────────────────────────────────────
   AGENT SECTION COMPONENT
   ────────────────────────────────────────────── */

interface AgentSectionProps {
    name: string;
    title: string;
    image: string;
    reviews: Review[];
    stats: { label: string; value: string }[];
    reversed?: boolean;
}

const ReviewCard = ({ review, idx }: { review: Review, idx: number, key?: any }) => {
    // Add useState dynamically (need React import if not destructured)
    const [expanded, setExpanded] = React.useState(false);
    const isLong = review.text.length > 180;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all relative group flex flex-col h-full"
        >
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11L8 15H11V19H5V15L7 11V7H11V11H10ZM20 11L18 15H21V19H15V15L17 11V7H21V11H20Z" fill="#770088"/>
                </svg>
            </div>
            
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
            </div>
            
            {/* Removed italic, kept regular text for readability */}
            <div className="text-slate-700 text-[15px] leading-relaxed mb-8 flex-grow">
                {expanded || !isLong ? review.text : review.text.substring(0, 180).trim() + '... '}
                {isLong && (
                    <button 
                        onClick={() => setExpanded(!expanded)} 
                        className="mt-2 font-semibold text-sm hover:opacity-80 transition-opacity block"
                        style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                        {expanded ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
                <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white"
                    style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                >
                    {review.author.charAt(0)}
                </div>
                <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">{review.author}</h4>
                    <p className="text-xs text-slate-500 font-medium">{review.location || 'Verified Client'}</p>
                </div>
            </div>
        </motion.div>
    );
};

const AgentReviewSection: React.FC<AgentSectionProps> = ({ name, title, image, reviews, stats, reversed }) => {
    return (
        <section className={`py-16 md:py-24 ${reversed ? 'bg-white/40' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Agent Profile Column (Sticky) */}
                    <div className="w-full lg:w-1/3 flex-shrink-0 lg:sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-purple-100/50 flex flex-col items-center"
                        >
                            <div 
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden p-[3px] shadow-xl mb-6 relative"
                                style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }}
                            >
                                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative bg-white">
                                    <img src={image} alt={name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2 text-center">{name}</h2>
                            <p 
                                className="font-medium text-sm text-center mb-6 px-4 py-1.5 bg-purple-50 rounded-full"
                                style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                            >
                                {title}
                            </p>
                            
                            <div className="w-full border-t border-slate-100 pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="text-center">
                                            <p className="text-xl font-display font-bold text-slate-900">{stat.value.split('·')[0]}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="w-full lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                            {reviews.map((review, idx) => (
                                <ReviewCard key={idx} review={review} idx={idx} />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

/* ──────────────────────────────────────────────
   MAIN REVIEWS PAGE
   ────────────────────────────────────────────── */

const Reviews: React.FC = () => {
    return (
        <div 
            className="h-auto font-sans relative selection:bg-purple-500/20"
            style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}
        >
            <SEOHead
                title="Reviews | GayRealEstateCT.net"
                description="Client testimonials for our real estate professionals."
                canonical="https://www.gayrealestateconnecticut.com/reviews"
                ogType="website"
            />
            <Header />
            <main className="relative z-10">
                {/* Hero */}
                <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.07),transparent_55%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.07),transparent_50%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(119,0,136,0.06),transparent_55%)] pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-4 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 rounded-full border border-purple-200/50 shadow-sm mb-8">
                                <Star className="w-4 h-4 text-purple-500 fill-purple-400" />
                                <span className="text-xs font-semibold text-slate-600 uppercase">5-Star Reviews</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
                                Trusted by <span style={{ background: 'linear-gradient(135deg, #770088, #004CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Clients</span> Across Connecticut
                            </h1>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-6 md:gap-12">
                            {[
                                { icon: Star, value: "5.0", label: "Rating" },
                                { icon: Users, value: "250+", label: "Clients" },
                                { icon: ThumbsUp, value: "100%", label: "Recommend" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl border flex items-center justify-center" style={{ background: 'rgba(119,0,136,0.08)', borderColor: 'rgba(119,0,136,0.18)' }}>
                                        <stat.icon className="w-4 h-4" style={{ color: '#6B008A' }} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </section>

                <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <AgentReviewSection
                    name="Arek Wtulich"
                    title="CT Realtor | William Raveis"
                    image="/images/Arek_Alt_1.jpg"
                    stats={[
                        { label: "Since", value: "2020" },
                        { label: "Locations", value: "Hartford · Middlesex · New Haven" },
                    ]}
                    reviews={arekReviews}
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Jake Earl"
                    title="Senior Vice President | Total Mortgage"
                    image="/images/jake.jpg?v=2"
                    stats={[
                        { label: "Since", value: "2010" },
                        { label: "License", value: "CT · MA · FL · TX · CA" },
                    ]}
                    reviews={jakeReviews}
                    reversed
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Abby Dudarewicz"
                    title="CT Realtor | SERHANT. CT"
                    image="/images/abby.png"
                    stats={[
                        { label: "Since", value: "2022" },
                        { label: "Locations", value: "Hartford · Middlesex" },
                    ]}
                    reviews={abbyReviews}
                />

                <div className="max-w-xs mx-auto flex items-center gap-4 px-4">
                    <div className="flex-1 h-px bg-purple-100" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }} />
                    <div className="flex-1 h-px bg-purple-100" />
                </div>

                <AgentReviewSection
                    name="Carolyn Futtner"
                    title="Real Estate Attorney | MPF Law"
                    image="/Carolyn+Futtner-1920w.webp"
                    stats={[
                        { label: "Since", value: "2005" },
                        { label: "Locations", value: "Connecticut" },
                    ]}
                    reviews={carolynReviews}
                    reversed
                />
                <Footer />
            </main>
        </div>
    );
};

export default Reviews;
