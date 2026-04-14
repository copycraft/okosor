import React, { useState } from 'react';
import {
    Thermometer,
    Shield,
    Zap,
    Menu,
    X,
    Phone,
    Mail,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    EyeOff
} from 'lucide-react';
import ContactForm from './components/ContactForm';

const HouseLogo = ({ className = "h-8 w-8" }) => (
    <div className={`${className} flex items-center justify-center rounded-lg bg-blue-50/50`}>
        <svg viewBox="0 0 64 64" className="w-full h-full p-2">
            <defs>
                <linearGradient id="houseGradHoriz" x1="0" y1="0.5" x2="1" y2="0.5">
                    <stop offset="0%" stopColor="#F87171"/> {/* Piros a bal oldalon */}
                    <stop offset="100%" stopColor="#3B82F6"/> {/* Kék a jobb oldalon */}
                </linearGradient>
            </defs>
            <polygon
                points="16,32 32,16 48,32 48,48 16,48"
                fill="none"
                stroke="url(#houseGradHoriz)"
                strokeWidth="5"
                strokeLinejoin="round"
            />
        </svg>
    </div>
);

export default function SmarthomeHome({ onBack }: { onBack?: () => void }): JSX.Element {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Horizontális gradient definíció
    const horizGrad = "linear-gradient(90deg, #F87171 0%, #3B82F6 100%)";

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
            {/* NAV */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        {onBack && (
                            <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div className="flex items-center gap-3">
                            <HouseLogo className="h-10 w-10" />
                            <span className="font-black text-xl tracking-tighter uppercase italic bg-clip-text text-transparent" style={{ backgroundImage: horizGrad }}>
                                OKOSŐR
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-500 uppercase">
                        {['Szolgáltatás', 'Csomagok', 'Kapcsolat'].map((item) => (
                            <button key={item} className="hover:text-slate-900 transition-colors">{item}</button>
                        ))}
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-white px-6 py-2.5 rounded-md shadow-md hover:scale-105 transition-transform"
                            style={{ background: horizGrad }}
                        >
                            AJÁNLATKÉRÉS
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="pt-48 pb-32 px-6 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-md mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Shield size={12} className="text-blue-500" /> Helyi Adatkezelés • Cloud Free
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-none uppercase">
                            Privát Otthon. <br />
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: horizGrad }}>
                                Biztonságban.
                            </span>
                        </h1>

                        <p className="text-slate-500 text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl font-medium">
                            Szegedi automatizálási megoldások. Nem csak kényelmet, hanem teljes digitális szuverenitást építünk.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="text-white px-10 py-5 rounded-lg text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-blue-200/50 transition-all"
                                style={{ background: horizGrad }}
                            >
                                Ingyenes felmérés <ChevronRight size={18} className="inline ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 border-y border-slate-100 bg-white px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        { title: "ZÁRT RENDSZER", desc: "Nincs külső elérés, minden adat az Ön falai között marad." },
                        { title: "SZAKÉRTŐ CSAPAT", desc: "Szegedi mérnöki támogatás a tervezéstől a telepítésig." },
                        { title: "KÖLTSÉGHATÉKONY", desc: "Nincs havidíj. Egyszeri beruházás, örökös kontroll." }
                    ].map((item, i) => (
                        <div key={i} className="relative">
                            <div className="h-1 w-12 mb-6" style={{ background: horizGrad }} />
                            <h3 className="font-black text-lg mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRICING */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Core", price: "350.000 Ft", color: "#64748b" },
                            { name: "Shield", price: "550.000 Ft", color: "url(#houseGradHoriz)", hot: true },
                            { name: "Elite", price: "Egyedi ár", color: "#1e293b" }
                        ].map((p, i) => (
                            <div key={i} className={`p-10 border ${p.hot ? 'border-blue-200 bg-blue-50/20' : 'border-slate-100'} rounded-2xl`}>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{p.name} csomag</h3>
                                <div className="text-3xl font-black mb-8 tracking-tighter" style={p.hot ? { color: '#3B82F6' } : {}}>
                                    {p.price}
                                </div>
                                <ul className="space-y-4 mb-10 text-sm font-semibold text-slate-600">
                                    <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-blue-500" /> Okos vezérlőközpont</li>
                                    <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-blue-500" /> Biztonsági szenzorok</li>
                                    <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-blue-500" /> Helyi konfiguráció</li>
                                </ul>
                                <button
                                    className={`w-full py-4 rounded-md text-xs font-black uppercase tracking-widest transition-all ${p.hot ? 'text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    style={p.hot ? { background: horizGrad } : {}}
                                >
                                    Részletek
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-32 bg-slate-50 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-slate-200 flex flex-col items-center">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-center">Kérjen konzultációt</h2>
                        <p className="text-slate-500 mb-12 text-center font-medium">Szakértőink segítenek összeállítani az Ön igényeinek megfelelő rendszert.</p>
                        <div className="w-full">
                            <ContactForm variant="blue" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}