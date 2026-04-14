import { useState, FormEvent } from 'react';
import { Send, Cpu, ChevronRight, CheckCircle } from 'lucide-react';
// import { supabase } from '../lib/supabase'; // Ha marad a Supabase, hagyd bent

type FormVariant = 'blue' | 'orange';

interface ContactFormProps {
    variant?: FormVariant;
}

export default function ContactForm({ variant = 'blue' }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // EPIC THEME DEFINITION
    const themes = {
        blue: {
            // PRÉMIUM MINIMALISTA (OkosŐr)
            wrapper: "font-sans bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden",
            inner: "p-10 md:p-14",
            title: "text-4xl font-black tracking-tighter text-slate-900 mb-2 uppercase italic",
            subtitle: "text-slate-400 text-sm mb-10 font-medium tracking-wide",
            label: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1",
            input: "w-full px-6 py-4 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-300 outline-none placeholder:text-slate-300 font-medium",
            button: "relative overflow-hidden group w-full py-5 rounded-xl font-black uppercase tracking-[0.3em] text-xs text-white transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-200",
            buttonBg: "bg-gradient-to-r from-[#F87171] to-[#3B82F6]",
            icon: <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />,
            statusSuccess: "bg-blue-50 text-blue-700 border-blue-100"
        },
        orange: {
            // TECH / INDUSTRIAL (3D_Home)
            wrapper: "font-tech bg-[#0a0a0a] border border-zinc-800 rounded-none relative",
            inner: "p-8 md:p-12 relative z-10",
            title: "font-wide text-2xl font-black text-white mb-1 tracking-tighter uppercase",
            subtitle: "text-orange-600/70 text-[10px] mb-8 font-bold tracking-[0.4em] uppercase",
            label: "text-[9px] font-bold text-zinc-500 mb-2 block tracking-[0.3em] uppercase",
            input: "w-full px-5 py-4 rounded-none border border-zinc-800 bg-zinc-900/50 text-orange-500 focus:border-orange-600 focus:bg-orange-600/5 transition-all duration-200 outline-none placeholder:text-zinc-700 font-mono text-sm",
            button: "w-full py-5 rounded-none font-bold uppercase tracking-[0.5em] text-[10px] text-white border border-orange-600/50 hover:bg-orange-600 hover:text-black transition-all duration-300 group",
            buttonBg: "bg-transparent hover:bg-orange-600",
            icon: <Cpu className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" />,
            statusSuccess: "bg-orange-600/10 text-orange-500 border-orange-600/20"
        }
    }[variant];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Ide jöhet a Supabase vagy N8N hívás
            await new Promise(r => setTimeout(r, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={themes.wrapper}>
            {/* Csak az orange (3D) variánsnál látható rácsháló dekoráció */}
            {variant === 'orange' && (
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]" />
            )}

            <div className={themes.inner}>
                <div className="mb-10">
                    <h3 className={themes.title}>Kapcsolatfelvétel</h3>
                    <p className={themes.subtitle}>
                        {variant === 'blue' ? "Kérjen mérnöki szaktanácsadást" : "[ INITIATE_DATA_TRANSFER ]"}
                    </p>
                </div>

                {submitStatus === 'success' && (
                    <div className={`mb-8 p-6 ${themes.statusSuccess} border flex items-center gap-4 animate-in fade-in slide-in-from-top-4`}>
                        <CheckCircle className="flex-shrink-0" />
                        <div>
                            <p className="font-bold uppercase tracking-wider text-xs">Sikeres küldés</p>
                            <p className="opacity-80 text-[10px] uppercase mt-1">Rendszerünk rögzítette az adatokat.</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className={themes.label}>Azonosító / Név</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={themes.input}
                                placeholder={variant === 'blue' ? "Teljes név" : "USER_ID"}
                            />
                        </div>

                        <div>
                            <label className={themes.label}>Kapcsolati Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={themes.input}
                                placeholder="email@domain.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={themes.label}>Telefonszám</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={themes.input}
                            placeholder="+36 __ ___ ____"
                        />
                    </div>

                    <div>
                        <label className={themes.label}>Üzenet / Projekt leírása</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={`${themes.input} resize-none`}
                            placeholder={variant === 'blue' ? "Miben segíthetünk?" : "> WAITING_FOR_INPUT..."}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={themes.button}
                        style={variant === 'blue' ? { background: "linear-gradient(90deg, #F87171 0%, #3B82F6 100%)" } : {}}
                    >
                        <div className="flex items-center justify-center gap-3 relative z-10">
                            <span>{isSubmitting ? 'Feldolgozás...' : 'Adatok küldése'}</span>
                            {!isSubmitting && themes.icon}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}