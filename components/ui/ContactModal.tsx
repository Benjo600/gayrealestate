import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';

export type ModalStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactModalProps {
    agentName: string;
    agentTitle: string;
    defaultMethod: 'call' | 'email' | 'schedule';
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ agentName, agentTitle, defaultMethod, onClose }) => {
    const [status, setStatus] = useState<ModalStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        method: defaultMethod === 'email' ? 'email' : defaultMethod === 'schedule' ? 'video-call' : 'phone-call',
        date: '',
        message: '',
    });

    const change = (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setForm(prev => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
            const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

            if (!token || !chatId || token === 'YOUR_BOT_TOKEN_HERE') {
                throw new Error('Telegram credentials not configured. Check your .env.local file.');
            }

            const methodLabels: Record<string, string> = {
                'phone-call': '📞 Phone Call',
                'email': '📧 Email',
                'video-call': '📹 Video Call',
                'in-person': '🤝 In-Person Meeting',
            };

            const now = new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
                dateStyle: 'medium',
                timeStyle: 'short',
            });

            const text = [
                `📅 *New Contact Request — ${agentName}*`,
                `_${agentTitle}_`,
                '',
                `👤 *Name:* ${form.name}`,
                `📧 *Email:* ${form.email || 'Not provided'}`,
                `📞 *Phone:* ${form.phone || 'Not provided'}`,
                `📬 *Preferred Contact:* ${methodLabels[form.method] ?? form.method}`,
                form.date ? `🗓 *Preferred Date/Time:* ${form.date}` : null,
                `💬 *Message:* ${form.message || 'None'}`,
                '',
                `🕐 _Received: ${now} ET_`,
            ].filter(Boolean).join('\n');

            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.description ?? `Telegram API error (${res.status})`);
            }

            setStatus('success');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            console.error('Telegram error:', err);
            setErrorMsg(msg);
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
        }
    };

    const inputCls = 'w-full px-2.5 py-1.5 md:px-3 md:py-2 border border-slate-200 rounded-lg md:rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all text-[13px] bg-white';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Panel */}
                <motion.div
                    initial={{ y: 60, opacity: 0, scale: 0.97 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 60, opacity: 0, scale: 0.97 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    className="relative z-10 bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-[#0f0f0f] px-4 py-3 md:px-6 md:py-4 flex items-start justify-between">
                        <div>
                            <p className="text-amber-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5 md:mb-1">Get in Touch</p>
                            <h2 className="text-white font-serif text-lg md:text-xl font-bold">{agentName}</h2>
                            <p className="text-white/40 text-[10px] md:text-[11px] mt-0.5">{agentTitle}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-4 py-4 md:px-6 md:py-5">
                        {status === 'success' ? (
                            <div className="text-center py-6 md:py-8">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">Request Sent!</h3>
                                <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed max-w-xs mx-auto">
                                    {agentName.split(' ')[0]} will reach out to you within one business day.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-4 md:mt-5 px-4 py-2 md:px-5 md:py-2 bg-[#0f0f0f] text-white text-xs md:text-[13px] font-semibold rounded-lg md:rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                    <div>
                                        <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Your Name *</label>
                                        <input required value={form.name} onChange={change('name')} placeholder="Jane Smith" className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Phone</label>
                                        <input type="tel" value={form.phone} onChange={change('phone')} placeholder="(860) 555-0100" className={inputCls} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Email</label>
                                    <input type="email" value={form.email} onChange={change('email')} placeholder="your@email.com" className={inputCls} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                                    <div>
                                        <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Preferred Contact</label>
                                        <select value={form.method} onChange={change('method')} className={inputCls}>
                                            <option value="phone-call">📞 Phone Call</option>
                                            <option value="email">📧 Email</option>
                                            <option value="video-call">📹 Video Call</option>
                                            <option value="in-person">🤝 In-Person</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Preferred Date/Time</label>
                                        <input type="datetime-local" value={form.date} onChange={change('date')} className={inputCls} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] md:text-[11px] font-semibold text-slate-600 mb-1">Message</label>
                                    <textarea
                                        value={form.message}
                                        onChange={change('message')}
                                        placeholder="Tell us a bit about what you're looking for..."
                                        className={`${inputCls} resize-none h-16 md:h-20`}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="text-[10px] md:text-[11px] text-red-600 bg-red-50 border border-red-200 rounded-lg md:rounded-xl px-3 py-2 md:px-3 md:py-2">{errorMsg}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-2.5 md:py-3 bg-[#0f0f0f] text-white font-bold rounded-lg md:rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-xs md:text-[13px] disabled:opacity-70 mt-1 md:mt-2"
                                >
                                    {status === 'submitting' ? (
                                        <><svg className="w-3 h-3 md:w-3.5 md:h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Sending…</>
                                    ) : (
                                        <><Send className="w-3 h-3 md:w-3.5 md:h-3.5" /> Send Request</>
                                    )}
                                </button>
                                <p className="text-center text-[9px] md:text-[10px] text-slate-400 mt-1.5 md:mt-0">🔒 Your information is private and shared only with {agentName.split(' ')[0]}.</p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
