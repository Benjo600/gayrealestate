import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Phone, MapPin, Home } from 'lucide-react';
import { sendEnquiryToTelegram } from '../services/telegramService';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EnquiryFormCard: React.FC = () => {
   const [status, setStatus] = useState<Status>('idle');
   const [errorMsg, setErrorMsg] = useState('');
   const [form, setForm] = useState({
      firstName: '', lastName: '', email: '', phone: '', interest: '', location: '', message: '',
   });

   const field =
      (key: keyof typeof form) =>
         (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm(prev => ({ ...prev, [key]: e.target.value }));

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      try {
         await sendEnquiryToTelegram(form);
         setStatus('success');
         setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', location: '', message: '' });
         setTimeout(() => setStatus('idle'), 5000);
      } catch (err: unknown) {
         const msg = err instanceof Error ? err.message : 'Something went wrong.';
         setErrorMsg(msg); setStatus('error');
         setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
      }
   };

   const isSubmitting = status === 'submitting';
   const isSuccess = status === 'success';
   const isError = status === 'error';

   const base = 'peer w-full h-12 px-4 pt-5 pb-1 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm placeholder-transparent focus:outline-none focus:border-slate-800 transition-colors duration-150';
   const iconBase = 'peer w-full h-12 pl-11 pr-4 pt-5 pb-1 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm placeholder-transparent focus:outline-none focus:border-slate-800 transition-colors duration-150';
   const lbl = 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all duration-150 pointer-events-none peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-900';
   const iconLbl = 'absolute left-11 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all duration-150 pointer-events-none peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-900';

   if (isSuccess) {
      return (
         <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5 translate-y-0 opacity-100 transition-all">
               <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">You're all set!</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
               One of our LGBTQ+ friendly experts will be in touch within one business day.
            </p>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
            <div className="relative">
               <input id="firstName" type="text" placeholder=" " required value={form.firstName} onChange={field('firstName')} className={base} />
               <label htmlFor="firstName" className={lbl}>First Name <span className="text-red-500">*</span></label>
            </div>
            <div className="relative">
               <input id="lastName" type="text" placeholder=" " required value={form.lastName} onChange={field('lastName')} className={base} />
               <label htmlFor="lastName" className={lbl}>Last Name <span className="text-red-500">*</span></label>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
               <input id="email" type="email" placeholder=" " value={form.email} onChange={field('email')} className={iconBase} />
               <label htmlFor="email" className={iconLbl}>Email Address</label>
            </div>
            <div className="relative">
               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
               <input id="phone" type="tel" placeholder=" " required value={form.phone} onChange={field('phone')} className={iconBase} />
               <label htmlFor="phone" className={iconLbl}>Phone <span className="text-red-500">*</span></label>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="relative">
               <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-20" />
               <select id="interest" value={form.interest} onChange={field('interest')}
                  className="w-full h-12 pl-11 pr-8 appearance-none bg-white border border-slate-300 rounded-lg text-slate-800 text-sm focus:border-slate-900 focus:text-slate-900 transition-colors duration-150 cursor-pointer">
                  <option value="" disabled>I'm Interested In</option>
                  <option>Buying a Home</option>
                  <option>Selling a Home</option>
                  <option>Buying &amp; Selling</option>
                  <option>Relocation</option>
                  <option>Investment Property</option>
                  <option>Re-financing</option>
                  <option>Legal Advice</option>
               </select>
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
               </div>
            </div>
            <div className="relative">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
               <input id="location" type="text" placeholder=" " value={form.location} onChange={field('location')} className={iconBase} />
               <label htmlFor="location" className={iconLbl}>Location</label>
            </div>
         </div>
         <div className="relative">
            <textarea id="message" placeholder=" " rows={3} value={form.message} onChange={field('message')}
               className="peer w-full px-4 pt-6 pb-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-sm placeholder-transparent focus:outline-none focus:border-slate-800 transition-colors duration-150 resize-none font-sans" />
            <label htmlFor="message" className="absolute left-4 top-3.5 text-slate-400 text-sm transition-all duration-150 pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-900 leading-none">
               Preferred agent or area in Connecticut?
            </label>
         </div>
         {isError && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{errorMsg}</div>}
         <button id="enquiry-submit-btn" type="submit" disabled={isSubmitting}
            className="relative overflow-hidden w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all duration-200 mt-2 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}>
            {isSubmitting
               ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
               : <>Connect with an Agent <Send className="w-4 h-4" /></>}
         </button>
         <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 select-none">
            🔒 Your information is secure and private
         </p>
      </form>
   );
};

const EnquiryForm: React.FC = () => {
   return (
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fff7f0 25%, #f0f9ff 50%, #f7fff4 75%, #fdf4ff 100%)' }}>
      {/* LGBTQ-toned radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(229,0,0,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(255,141,0,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_80%,rgba(2,129,33,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(0,76,255,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(119,0,136,0.05),transparent_55%)] pointer-events-none" />

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Left Column: Copy & Social Proof */}
            <div className="flex-1 text-center md:text-left">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                  Your Dream Home <br className="hidden md:block"/>
                  <span style={{
                     background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     display: 'inline-block',
                     animation: 'pride-hue 4s linear infinite',
                  }}>Awaits</span>
               </h2>
               <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                  Connect with our exclusive network of LGBTQ+ friendly real estate professionals across Connecticut.
               </p>
               
               <div className="space-y-4 mb-10">
                  {['End-to-End Service', 'Expert Guidance', 'Inclusive by Design'].map((label, i) => (
                     <div key={i} className="flex items-center justify-center md:justify-start gap-3 text-slate-700 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        {label}
                     </div>
                  ))}
               </div>

               {/* Social proof */}
               <div className="flex justify-center md:justify-start items-center gap-6 border-t border-slate-200 pt-8">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden">
                           <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`} alt="Client" className="w-full h-full object-cover" />
                        </div>
                     ))}
                  </div>
                  <div className="text-left">
                     <p className="text-sm font-semibold text-slate-800">Trusted by 250+ Clients</p>
                     <div className="flex text-amber-500 text-xs mt-1">★★★★★</div>
                  </div>
               </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-lg">
               <EnquiryFormCard />
            </div>
         </div>
      </section>
   );
};

export default EnquiryForm;