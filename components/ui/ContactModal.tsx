import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, Mail, Video, Users } from 'lucide-react';
import { sendGenericTelegram } from '../../services/telegramService';

export type ModalStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactModalProps {
    agentName: string;
    agentId: string;
    agentTitle: string;
    defaultMethod: 'call' | 'email' | 'schedule';
    onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ agentName, agentId, agentTitle, defaultMethod, onClose }) => {
    const [status, setStatus] = useState<ModalStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
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
            const methodLabels: Record<string, string> = {
                'phone-call': '📞 Phone Call',
                'email': '📧 Email',
                'video-call': '📹 Video Call',
                'in-person': '🤝 In-Person Meeting',
            };

            const text = [
                `📅 *Contact Request — ${agentName}*`,
                `_${agentTitle}_`,
                '',
                `👤 *Name:* ${form.name}`,
                `📞 *Phone:* ${form.phone || 'Not provided'}`,
                `📧 *Email:* ${form.email || 'Not provided'}`,
                `📬 *Method:* ${methodLabels[form.method] ?? form.method}`,
                form.date ? `🗓 *Date/Time:* ${form.date}` : null,
                `💬 *Message:* ${form.message || 'None'}`,
            ].filter(Boolean).join('\n');

            await sendGenericTelegram(text, agentId);
            setStatus('success');
        } catch (err: unknown) {
            setErrorMsg(err instanceof Error ? err.message : 'Please try again.');
            setStatus('error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
        }
    };

    const contactMethods = [
        { value: 'phone-call', label: 'Phone', icon: Phone },
        { value: 'email',      label: 'Email',      icon: Mail },
        { value: 'video-call', label: 'Video', icon: Video },
        { value: 'in-person',  label: 'Meet',  icon: Users },
    ];

    const inputCls = [
        'w-full px-3 py-2.5 rounded-xl text-sm text-slate-900 placeholder-slate-400',
        'bg-white/80 border border-slate-200',
        'focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 focus:bg-white',
        'transition-all duration-200',
    ].join(' ');

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                {/* Frosted Backdrop - Reduced Blur for Performance */}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

                {/* Panel - Switched to Shorter Ease for Snappiness */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl shadow-2xl bg-white flex flex-col max-h-[90vh]"
                >
                    {/* Brand Gradient Bar */}
                    <div className="h-1.5 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #E50000, #FF8D00, #FFEE00, #028121, #004CFF, #770088)' }} />

                    {/* Header */}
                    <div className="px-5 pt-4 pb-3 flex items-start justify-between bg-slate-50/80 border-b border-slate-100 flex-shrink-0">
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-600 mb-0.5">Contact Agent</p>
                            <h2 className="text-slate-900 font-display text-lg font-bold leading-tight">{agentName}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 active:scale-90 transition-all font-bold"
                            aria-label="Close"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-4 overflow-y-auto custom-scrollbar-hide">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Request Sent!</h3>
                                <p className="text-slate-500 text-[13px] leading-relaxed max-w-[250px] mx-auto">
                                    {agentName.split(' ')[0]} will reach out to you within one business day.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-5 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl active:scale-95 transition-all"
                                >
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Your Name *</label>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={change('name')}
                                            placeholder="Jane Smith"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Phone *</label>
                                        <input
                                            required
                                            type="tel"
                                            value={form.phone}
                                            onChange={change('phone')}
                                            placeholder="(860) 555-0100"
                                            className={inputCls}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                                        Email {form.method === 'email' ? <span className="text-red-500 font-black">*</span> : <span className="text-slate-400 font-normal lowercase tracking-normal">(Optional)</span>}
                                    </label>
                                    <input
                                        required={form.method === 'email'}
                                        type="email"
                                        value={form.email}
                                        onChange={change('email')}
                                        placeholder="your@email.com"
                                        className={inputCls}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Preferred Contact</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {contactMethods.map(({ value, label, icon: Icon }) => {
                                            const active = form.method === value;
                                            return (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => setForm(p => ({ ...p, method: value }))}
                                                    className={`
                                                        flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[10px] font-bold transition-all duration-150
                                                        ${active 
                                                            ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]' 
                                                            : 'bg-white border-slate-200 text-slate-500 active:bg-slate-50'}
                                                    `}
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {form.method !== 'email' && (
                                        <motion.div 
                                            key="date-field"
                                            initial={{ opacity: 0, scale: 0.98 }} 
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.15 }}
                                            className="space-y-1.5"
                                        >
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Prefered Date & Time</label>
                                            <input
                                                type="datetime-local"
                                                value={form.date}
                                                onChange={change('date')}
                                                className={inputCls}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Message</label>
                                    <textarea
                                        value={form.message}
                                        onChange={change('message')}
                                        placeholder="I'm interested in working with you..."
                                        className={`${inputCls} resize-none h-20`}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{errorMsg}</div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 mt-2 hover:brightness-110 active:brightness-90 transition-all"
                                    style={{ background: 'linear-gradient(135deg, #C0003A 0%, #6B008A 45%, #0A2FA8 100%)' }}
                                >
                                    {status === 'submitting' ? (
                                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                                    ) : (
                                        <><Send className="w-3.5 h-3.5" /> Send Request</>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
