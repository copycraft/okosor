import React from 'react';
import { ArrowLeft, Code2, ShoppingCart, Layout, Zap, Terminal, Activity, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

interface WebsiteHomeProps {
    onBack: () => void;
}

const SkillCard = ({ title, desc, items, icon: Icon, colorClass, hoverClass }: { title: string, desc: string, items: string[], icon: any, colorClass: string, hoverClass: string }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className={`group relative bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[2.5rem] backdrop-blur-2xl transition-all duration-300 overflow-hidden hover:border-current ${hoverClass}`}
    >
        <div className={`p-4 rounded-2xl w-fit mb-6 transition-colors duration-300 ${colorClass}`}>
            <Icon size={28} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-medium">{desc}</p>

        <div className="grid grid-cols-1 gap-4"> {/* Megnövelt gap a sorok között */}
            {items.map(item => (
                <div key={item} className="flex items-center gap-3 group/item">
                    <div className="w-1 h-4 rounded-full bg-zinc-800 group-hover/item:bg-current transition-colors" />
                    <span className="text-xs font-mono text-zinc-400 group-hover/item:text-zinc-200 transition-colors tracking-wide">{item}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

export default function WebsiteHome({ onBack }: WebsiteHomeProps): JSX.Element {
    return (
        <div className="relative min-h-screen bg-[#020202] text-zinc-100 font-sans p-6 md:p-12 overflow-hidden selection:bg-emerald-500/30">

            {/* HÁTTÉR PATTERN */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-emerald-500/10 blur-[140px] rounded-full opacity-40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Navigáció */}
                <nav className="flex justify-between items-center mb-24">
                    <button onClick={onBack} className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-all">
                        <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all group-hover:border-emerald-500/50">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Vissza</span>
                    </button>

                    <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-5 py-2 rounded-full backdrop-blur-md">
                        <Terminal size={14} className="text-emerald-500" />
                        <span className="font-mono text-[10px] text-zinc-400 tracking-[0.2em] uppercase">Dev_Env: Active</span>
                    </div>
                </nav>

                {/* Hero rész */}
                <header className="mb-24 relative">
                    <motion.div className="inline-flex items-center gap-3 text-emerald-500 font-mono text-[10px] mb-8 tracking-[0.5em] uppercase bg-emerald-500/5 px-4 py-1.5 rounded-lg border border-emerald-500/10">
                        <Zap size={12} className="fill-emerald-500" /> Rendszer üzemkész
                    </motion.div>

                    <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter mb-10 leading-[0.9] md:leading-[0.85]">
                        WEB
                        <span className="block mt-4 relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 pb-4">
            MŰHELY
        </span>
                    </h1>

                    <p className="max-w-xl text-zinc-500 text-lg md:text-xl leading-relaxed font-medium border-l-2 border-emerald-500/20 pl-6">
                        Egyedi React és WooCommerce alapú rendszerek fejlesztése.
                        Modern technológiák, kompromisszumok nélkül.
                    </p>
                </header>

                {/* Technológiai pillérek - ÚJ SORREND ÉS SZÍNEK */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">

                    {/* 1. WOOCOMMERCE - LILA HOVER */}
                    <SkillCard
                        title="WooCommerce"
                        desc="Professzionális webshopok, egyedi fizetési és szállítási logikával."
                        icon={ShoppingCart}
                        colorClass="bg-purple-500/10 text-purple-400"
                        hoverClass="hover:text-purple-400 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)]"
                        items={["E-com Architektúra", "Stripe / Barion", "API Integrációk", "Sebesség Optimalizálás"]}
                    />

                    {/* 2. WORDPRESS - KÉK HOVER */}
                    <SkillCard
                        title="WordPress"
                        desc="Többnyelvű oldalak, blogok és egyedi sablonok fejlesztése."
                        icon={Layout}
                        colorClass="bg-blue-500/10 text-blue-400"
                        hoverClass="hover:text-blue-400 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]"
                        items={["Blog & Content rendszerek", "WPML / Többnyelvűség", "Custom Themes (ACF Pro)", "Security Hardening"]}
                    />

                    {/* 3. REACT - CIAN HOVER (UTOLSÓ) */}
                    <SkillCard
                        title="React Appok"
                        desc="Modern, komponens alapú felületek TypeScript és Next.js használatával."
                        icon={Code2}
                        colorClass="bg-cyan-500/10 text-cyan-400"
                        hoverClass="hover:text-cyan-400 hover:shadow-[0_0_50px_-12px_rgba(6,182,212,0.2)]"
                        items={["Next.js App Router", "Tailwind Design", "Framer Motion", "Custom Hooks"]}
                    />
                </div>

                {/* Uptime Szekció */}
                <div className="relative overflow-hidden rounded-[3rem] border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 to-black p-12 mb-20">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 tracking-tight uppercase text-white/90 italic">Szerver Státusz</h2>
                            <p className="text-zinc-500 font-mono text-xs lowercase">
                                // Monitorozva: Uptime Kuma
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <div className="flex items-center gap-4 mb-1">
                                <Activity className="text-emerald-500 animate-pulse" size={24} />
                                <span className="text-6xl font-black text-white tracking-tighter">99.9%</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em]">Havi rendelkezésre állás</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 max-w-7xl mx-auto py-12 flex justify-between items-center border-t border-zinc-900/50">
                <div className="font-mono text-[9px] text-zinc-700 tracking-[0.5em] uppercase">
                    &copy; 2026 WEB_MŰHELY // ALL_SYSTEMS_GO
                </div>
            </footer>
        </div>
    );
}