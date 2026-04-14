import {
    Layers,
    Box,
    Palette,
    Clock,
    Settings,
    ArrowLeft,
    Phone,
    Mail,
    ChevronRight,
    Cpu,
    Binary
} from 'lucide-react';
import ContactForm from './components/ContactForm';

const Printer3D = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M4 10V4h16v6" />
        <path d="m9 18 3 3 3-3" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v10" />
        <rect width="20" height="8" x="2" y="14" />
    </svg>
);

interface ThreeDHomeProps {
    onBack: () => void;
}

export default function ThreeDHome({ onBack }: ThreeDHomeProps): JSX.Element {
    // Közös gradiens osztályok a kód tisztasága érdekében
    const orangeGradient = "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600";
    const orangeTextGradient = "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500";

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-orange-600/50">
            {/* HUD NAVIGÁCIÓ */}
            <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
                <div className="max-w-[1600px] mx-auto px-6 h-14 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <button onClick={onBack} className="text-zinc-500 hover:text-orange-500 transition-all">
                            <ArrowLeft size={18} />
                        </button>
                        <div className="flex items-center gap-3">
                            <Printer3D />
                            <span className="font-tech text-[10px] font-bold tracking-[0.4em]">3DHOME.SYS</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-tech text-[9px] text-zinc-600">
                        <span className={`${orangeTextGradient} font-bold`}>STÁTUSZ // AKTÍV</span>
                        <span>SZEGED_NODE_01</span>
                    </div>
                </div>
            </nav>

            {/* HERO - INDUSZTRIÁLIS RÁCS */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="max-w-[1400px] mx-auto relative">
                    <div className={`flex items-center gap-2 mb-8 font-tech text-[10px] ${orangeTextGradient} font-bold`}>
                        <Binary size={14} className="text-orange-500" /> RENDSZER_INICIALIZÁLVA
                    </div>

                    <h1 className="font-wide text-5xl md:text-[6.5rem] leading-none font-bold mb-10 tracking-tighter">
                        HARDVER <br />
                        <span className={orangeTextGradient}>GYÁRTÁS.</span>
                    </h1>

                    <div className="grid md:grid-cols-2 gap-16 items-end">
                        <p className="text-zinc-500 max-w-md text-sm leading-relaxed uppercase tracking-tight font-medium">
                            Precíziós bérnyomtatás szegedi bázissal. 4-színű multicolor technológia, technikai polimerek, mérnöki pontosságú prototípusok.
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`${orangeGradient} text-white px-8 py-4 font-tech text-[11px] hover:brightness-110 transition-all self-start border border-orange-500/20 shadow-[0_0_20px_rgba(234,88,12,0.2)]`}
                            >
                                [ PROJEKT_INDÍTÁSA ]
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ADATRÁCS - SPECIFIKÁCIÓK */}
            <section className="grid grid-cols-1 md:grid-cols-3 bg-zinc-900/10 border-b border-zinc-900">
                {[
                    { label: "FELBONTÁS (LAYER)", val: "0.2 MM - 0.6 MM" },
                    { label: "MUNKATERÜLET", val: "256 × 256 × 256 MM" },
                    { label: "SZÍNEK ÉS ANYAGOK", val: "4 EGYSZERRE (AMS)" }
                ].map((s, i) => (
                    <div key={i} className="p-10 border-r border-zinc-900 last:border-r-0 flex flex-col justify-center items-center md:items-start group transition-colors hover:bg-white/[0.02]">
                        <div className="text-[9px] font-tech text-zinc-600 mb-2 tracking-[0.3em] uppercase group-hover:text-zinc-400 transition-colors">{s.label}</div>
                        <div className={`font-tech text-xl font-black italic group-hover:scale-105 transition-transform origin-left ${orangeTextGradient}`}>{s.val}</div>
                    </div>
                ))}
            </section>

            {/* MAGMODULOK */}
            <section id="services" className="py-24 max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <h2 className="font-tech text-2xl font-bold tracking-widest text-white mb-4 uppercase italic">Mag_Modulok</h2>
                        <p className="text-zinc-500 max-w-xl text-sm uppercase font-semibold">
                            A koncepciótól a funkcionális alkatrészig.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-1 bg-zinc-900 border border-zinc-900 shadow-2xl">
                    {[
                        {
                            title: "MULTICOLOR",
                            desc: "Vizuális modellek és logók 4-színű AMS technológiával, rétegváltás nélküli kivitelben.",
                            icon: <Palette size={24}/>
                        },
                        {
                            title: "MÉRNÖKI MUNKA",
                            desc: "Műszaki alkatrészek, konzolok és egyedi homelab kiegészítők gyártása ipari anyagokból.",
                            icon: <Settings size={24}/>
                        },
                        {
                            title: "LOGISZTIKA",
                            desc: "Gyors prototípusgyártás Szegeden, személyes átvétellel vagy országos szállítással.",
                            icon: <Clock size={24}/>
                        }
                    ].map((s, i) => (
                        <div key={i} className="group bg-black p-10 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-5 font-tech text-[40px] font-black group-hover:opacity-10 transition-opacity">0{i+1}</div>
                            <div className="mb-8 text-orange-500 group-hover:scale-110 transition-transform">
                                {s.icon}
                            </div>
                            <h3 className="font-tech text-sm font-bold mb-4 tracking-widest uppercase italic group-hover:text-white transition-colors">{s.title}</h3>
                            <p className="text-zinc-500 text-xs leading-relaxed uppercase font-medium">
                                {s.desc}
                            </p>
                            {/* Hover aláhúzás gradienssel */}
                            <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${orangeGradient}`} />
                        </div>
                    ))}
                </div>
            </section>

            {/* TECHNIKAI RÉSZLETEK */}
            <section className="py-24 bg-[#080808] border-y border-zinc-900">
                <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-600/5 blur-[100px]" />
                        <div className="bg-black border border-zinc-800 p-12 aspect-square flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]" />
                            <Box size={100} className="text-zinc-800 group-hover:text-orange-600 transition-colors" />
                            <div className="absolute bottom-6 font-tech text-[9px] text-zinc-600 tracking-widest">RENDER_FOLYAMATBAN</div>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-tech text-2xl font-bold mb-10 tracking-[0.2em] uppercase italic">Specifikációk</h2>
                        <ul className="space-y-6">
                            {[
                                "Bambu Lab A1 technológia // 0.2mm - 0.6mm rétegfelbontás",
                                "Multicolor (AMS) támogatás: 4 szín egyidejű használata",
                                "Funkcionális modellek optimalizálása és mérnöki tanácsadás",
                                "Szegedi átvételi pont // Országos logisztikai hálózat"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-4 border-b border-zinc-900 pb-4 group">
                                    <Cpu size={14} className="text-orange-600 group-hover:rotate-90 transition-transform duration-500" />
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-tight group-hover:text-zinc-100 transition-colors">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* KAPCSOLATI TERMINÁL */}
            <section id="contact" className="py-24 max-w-xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className={`font-tech text-2xl font-bold mb-4 tracking-[0.3em] uppercase italic ${orangeTextGradient}`}>Modell_Feltöltés</h2>
                    <div className={`h-[2px] w-12 mx-auto mb-4 shadow-[0_0_10px_rgba(234,88,12,0.5)] ${orangeGradient}`} />
                    <p className="text-zinc-600 text-[10px] font-tech tracking-widest uppercase">Kész tervek vagy konzultáció — Segítünk a megvalósításban.</p>
                </div>
                <div className="bg-black border border-zinc-800 p-1 shadow-2xl relative">
                    {/* Keret gradiens effekt */}
                    <div className={`absolute -inset-[1px] ${orangeGradient} opacity-20 -z-10`} />
                    <ContactForm variant="orange" />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 border-t border-zinc-900 bg-black">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className={`${orangeGradient} p-2 shadow-[0_0_15px_rgba(234,88,12,0.3)]`}>
                            <Printer3D size={18} className="text-white" />
                        </div>
                        <span className="font-tech text-xs font-bold tracking-[0.3em] uppercase italic">3DHome // 2026</span>
                    </div>

                    <div className="flex gap-10 font-tech text-[9px] text-zinc-500 uppercase tracking-widest">
                        <a href="tel:+36204545501" className="hover:text-orange-500 transition-colors">TEL // +36 20 454 5501</a>
                        <a href="mailto:info@okosor.hu" className="hover:text-orange-500 transition-colors">MAIL // INFO@OKOSOR.HU</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}