import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Phone, MapPin, Home, Sparkles } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Inner form card — defined first so EnquiryForm can reference it
───────────────────────────────────────────────────────────────────────────── */

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EnquiryFormCard: React.FC = () => {
   const [status, setStatus] = useState<Status>('idle');
   const [errorMsg, setErrorMsg] = useState('');

   const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: '',
      location: '',
      message: '',
   });

   /** Generic change handler */
   const field =
      (key: keyof typeof form) =>
         (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm(prev => ({ ...prev, [key]: e.target.value }));

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');

      try {
         const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
         const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

         if (!token || !chatId || token === 'YOUR_BOT_TOKEN_HERE') {
            throw new Error(
               'Telegram credentials not configured. Open .env.local and fill in VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID.'
            );
         }

         const now = new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            dateStyle: 'medium',
            timeStyle: 'short',
         });

         const text = [
            '🏠 *New Enquiry — Connecticut Real Estate*',
            '',
            `👤 *Name:* ${form.firstName} ${form.lastName}`,
            `📧 *Email:* ${form.email || 'Not provided'}`,
            `📞 *Phone:* ${form.phone}`,
            `🎯 *Interest:* ${form.interest || 'Not specified'}`,
            `📍 *Location:* ${form.location || 'Not specified'}`,
            `💬 *Message:* ${form.message || 'None'}`,
            '',
            `🕐 _Received: ${now} ET_`,
         ].join('\n');

         const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
            }
         );

         if (!res.ok) {
            const err = await res.json();
            throw new Error(err?.description ?? `Telegram API error (${res.status})`);
         }

         setStatus('success');
         setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', location: '', message: '' });
         setTimeout(() => setStatus('idle'), 4000);

      } catch (err: unknown) {
         const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
         console.error('Telegram submission error:', err);
         setErrorMsg(msg);
         setStatus('error');
         setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
      }
   };

   const isSubmitting = status === 'submitting';
   const isSuccess = status === 'success';
   const isError = status === 'error';

   /* Shared Tailwind class strings */
   const baseCls = 'peer w-full h-11 md:h-12 px-3 md:px-4 pt-4 md:pt-5 pb-1 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white text-[13px] md:text-sm placeholder-transparent focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 focus:bg-slate-800/70';
   const iconCls = 'peer w-full h-11 md:h-12 pl-10 md:pl-11 pr-3 md:pr-4 pt-4 md:pt-5 pb-1 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white text-[13px] md:text-sm placeholder-transparent focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 focus:bg-slate-800/70';
   const labelCls = 'absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] md:text-sm transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:md:text-xs peer-focus:text-brand-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:md:text-xs peer-[:not(:placeholder-shown)]:text-slate-300';
   const iconLabelCls = 'absolute left-10 md:left-11 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] md:text-sm transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:md:text-xs peer-focus:text-brand-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:md:text-xs peer-[:not(:placeholder-shown)]:text-slate-300';

   return (
      <div className="glass-premium rounded-[1.5rem] md:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-10 relative overflow-hidden shadow-2xl backdrop-blur-2xl bg-white/5">

         {/* Gradient overlays */}
         <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/20 via-transparent to-gold-500/20 pointer-events-none" />
         <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-400/30 to-gold-400/30 -z-10 blur-sm" />

         {/* Corner accents */}
         <div className="absolute top-6 left-6   w-10 h-10 border-l-2 border-t-2 rounded-tl-lg pointer-events-none opacity-40" style={{ borderImage: 'linear-gradient(to bottom right, rgb(212,175,55), rgb(124,58,237)) 1' }} />
         <div className="absolute top-6 right-6  w-10 h-10 border-r-2 border-t-2 rounded-tr-lg pointer-events-none opacity-40" style={{ borderImage: 'linear-gradient(to bottom left,  rgb(212,175,55), rgb(124,58,237)) 1' }} />
         <div className="absolute bottom-6 left-6  w-10 h-10 border-l-2 border-b-2 rounded-bl-lg pointer-events-none opacity-40" style={{ borderImage: 'linear-gradient(to top right,   rgb(212,175,55), rgb(124,58,237)) 1' }} />
         <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 rounded-br-lg pointer-events-none opacity-40" style={{ borderImage: 'linear-gradient(to top left,    rgb(212,175,55), rgb(124,58,237)) 1' }} />
         <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

         <form className="relative z-10 space-y-5" onSubmit={handleSubmit} noValidate>

            {/* ── Row 1 · Name ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="relative">
                  <input id="firstName" type="text" placeholder=" " required value={form.firstName} onChange={field('firstName')} className={baseCls} />
                  <label htmlFor="firstName" className={labelCls}>First Name <span className="text-red-400">*</span></label>
               </div>
               <div className="relative">
                  <input id="lastName" type="text" placeholder=" " required value={form.lastName} onChange={field('lastName')} className={baseCls} />
                  <label htmlFor="lastName" className={labelCls}>Last Name <span className="text-red-400">*</span></label>
               </div>
            </div>

            {/* ── Row 2 · Contact ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
               {/* Email */}
               <div className="relative">
                  <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                  <input id="email" type="email" placeholder=" " value={form.email} onChange={field('email')} className={iconCls} />
                  <label htmlFor="email" className={iconLabelCls}>Email Address <span className="text-slate-500 text-[10px] md:text-xs">(Optional)</span></label>
               </div>
               {/* Phone */}
               <div className="relative">
                  <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                  <input id="phone" type="tel" placeholder=" " required value={form.phone} onChange={field('phone')} className={iconCls} />
                  <label htmlFor="phone" className={iconLabelCls}>Phone <span className="text-red-400">*</span></label>
               </div>
            </div>

            {/* ── Row 3 · Property ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
               {/* Interest select */}
               <div className="relative">
                  <Home className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-20 pointer-events-none" />
                  <select id="interest" value={form.interest} onChange={field('interest')} className="w-full h-11 md:h-12 pl-10 md:pl-11 pr-8 md:pr-10 appearance-none bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-slate-400 text-[13px] md:text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:text-white transition-all duration-300 cursor-pointer focus:bg-slate-800/70">
                     <option value="" disabled>I'm Interested In</option>
                     <option>Buying a Home</option>
                     <option>Selling a Home</option>
                     <option>Buying &amp; Selling</option>
                     <option>Relocation</option>
                     <option>Investment Property</option>
                     <option>Re-financing</option>
                     <option>Legal Advice</option>
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
               </div>
               {/* Location */}
               <div className="relative">
                  <MapPin className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                  <input id="location" type="text" placeholder=" " value={form.location} onChange={field('location')} className={iconCls} />
                  <label htmlFor="location" className={iconLabelCls}>Location <span className="text-slate-500 text-[10px] md:text-xs">(Optional)</span></label>
               </div>
            </div>

            {/* ── Message ── */}
            <div className="relative">
               <textarea
                  id="message"
                  placeholder=" "
                  rows={3}
                  value={form.message}
                  onChange={field('message')}
                  className="peer w-full min-h-[80px] md:min-h-[100px] px-3 md:px-4 pt-5 md:pt-6 pb-2 bg-slate-800/50 border-2 border-slate-700/50 rounded-xl text-white text-[13px] md:text-sm placeholder-transparent focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300 resize-none focus:bg-slate-800/70"
               />
               <label htmlFor="message" className="absolute left-3 md:left-4 top-3 md:top-4 text-slate-400 text-[13px] md:text-sm transition-all duration-300 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:md:text-xs peer-focus:text-brand-300 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:md:text-xs peer-[:not(:placeholder-shown)]:text-slate-300">
                  Tell us if you have a preferred agent and/or area of CT <span className="text-slate-500 text-[10px] md:text-xs">(optional)</span>
               </label>
            </div>

            {/* ── Error banner ── */}
            {isError && (
               <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errorMsg}
               </div>
            )}

            {/* ── Submit button ── */}
            <div className="pt-2 md:pt-4">
               <button
                  id="enquiry-submit-btn"
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`group relative w-full md:w-auto md:min-w-[280px] mx-auto flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-xl text-white font-semibold text-[13px] md:text-sm shadow-lg transition-all duration-500 overflow-hidden ${isSuccess ? 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-500/40 cursor-default'
                     : isError ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/30 cursor-default'
                        : isSubmitting ? 'bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 opacity-80 cursor-wait'
                           : 'bg-gradient-to-r from-brand-500 via-brand-600 to-gold-500 hover:shadow-2xl hover:shadow-brand-500/50 hover:scale-[1.02]'
                     }`}
               >
                  {/* Hover shine — only on idle */}
                  {!isSuccess && !isError && !isSubmitting && (
                     <>
                        <span className="absolute inset-0 bg-gradient-to-r from-gold-500 via-brand-600 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                     </>
                  )}

                  <span className="relative flex items-center gap-2">
                     {isSubmitting && (
                        <>
                           <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                           </svg>
                           Sending…
                        </>
                     )}
                     {isSuccess && (
                        <>
                           <CheckCircle2 className="w-5 h-5 animate-pulse" />
                           Message Sent! We'll be in touch soon.
                        </>
                     )}
                     {isError && (
                        <>
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                           Failed — Please try again shortly
                        </>
                     )}
                     {!isSubmitting && !isSuccess && !isError && (
                        <>
                           Connect with an Agent
                           <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                  </span>
               </button>
            </div>

            <p className="text-center text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
               <svg className="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
               Your information is secure and shared only with us
            </p>
         </form>
      </div>
   );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Outer section — layout & decorative elements only
───────────────────────────────────────────────────────────────────────────── */

const EnquiryForm: React.FC = () => {
   return (
      <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 relative overflow-hidden">
         {/* Premium Animated Background */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.15),transparent_50%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.1),transparent_50%)]" />

         {/* Floating orbs */}
         <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-float-subtle" />
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

         {/* Grid overlay */}
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
            }}
         />

         {/* Top / bottom gradient accent lines */}
         <div className="absolute top-0    left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50  to-transparent" />
         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Header */}
            <div className="text-center mb-8 md:mb-12 space-y-4 md:space-y-5">
               <div className="inline-flex items-center gap-2.5 px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-brand-500/20 to-gold-500/20 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
                  <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-gold-400" />
                  <span className="tracking-widest uppercase text-[10px] md:text-xs font-bold bg-gradient-to-r from-brand-300 to-gold-300 bg-clip-text text-transparent">Premium Service</span>
               </div>

               <h2 className="text-4xl md:text-5xl font-display font-semibold text-white leading-tight tracking-tight">
                  Your Dream Home <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-gold-400 bg-clip-text text-transparent">Awaits</span>
               </h2>

               <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
                  Connect with our exclusive network of LGBTQ+ friendly real estate professionals
               </p>

               <div className="flex flex-wrap justify-center gap-6 pt-3">
                  {['Elevated, End-to-End Service', 'Expert Guidance You Can Trust', 'Inclusive by Design'].map((label, i) => (
                     <div key={i} className="flex items-center gap-2.5 text-slate-200 font-medium text-sm">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-500 to-gold-500 flex items-center justify-center shrink-0 shadow-lg">
                           <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        {label}
                     </div>
                  ))}
               </div>
            </div>

            {/* Form card */}
            <EnquiryFormCard />

            {/* Social Proof */}
            <div className="mt-10 flex justify-center items-center gap-8">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="w-11 h-11 rounded-full border-2 border-slate-700 bg-slate-200 overflow-hidden shadow-xl ring-2 ring-brand-500/20">
                        <img
                           src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`}
                           alt="Client"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  ))}
                  <div className="w-11 h-11 rounded-full border-2 border-slate-700 bg-gradient-to-br from-brand-500 to-gold-500 flex items-center justify-center text-xs font-bold text-white shadow-xl ring-2 ring-brand-500/20">
                     250+
                  </div>
               </div>
               <div className="text-left">
                  <div className="flex text-gold-400 text-lg mb-1">★★★★★</div>
                  <p className="text-sm text-white font-semibold">Trusted by 250+ Clients</p>
               </div>
            </div>

         </div>
      </section>
   );
};

export default EnquiryForm;