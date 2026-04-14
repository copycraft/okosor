import React, { useState } from 'react';
import { Home, ChevronRight, Globe, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SmarthomeContent from './SmarthomeHome.tsx';
import ThreeDHomeContent from './3DHome.tsx';
import WebsiteContent from './WebsiteHome.tsx';

const Printer3D = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 10V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
        <path d="m9 18 3 3 3-3" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v10" />
        <rect width="20" height="8" x="2" y="14" rx="2" />
    </svg>
);

type View = 'portal' | '3d' | 'smarthome' | 'websites';

export default function App(): JSX.Element {
    const [view, setView] = useState<View>('portal');
    const [expanding, setExpanding] = useState<View | null>(null);

    const handleNavigation = (target: View) => {
        setExpanding(target);
        setTimeout(() => {
            setView(target);
            setExpanding(null);
        }, 750);
    };

    const pageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <main className="relative min-h-screen w-full bg-black overflow-hidden selection:bg-orange-500/30">
            <AnimatePresence mode="wait">
                {view === 'portal' && (
                    <motion.div
                        key="portal"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="relative min-h-screen w-full flex flex-col md:flex-row font-sans"
                    >
                        {/* Header */}
                        <header className={`absolute top-0 left-0 w-full z-30 flex justify-center p-6 pointer-events-none transition-opacity duration-300 ${expanding ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 px-8 py-3 rounded-2xl shadow-2xl">
                                <p className="text-white font-bold tracking-[0.3em] uppercase text-[10px] text-center">
                                    Válasszon divíziót <span className="text-emerald-500 mx-2">•</span> OkosŐr
                                </p>
                            </div>
                        </header>

                        {/* BAL OLDAL: WEB MŰHELY */}
                        <div
                            onClick={() => !expanding && handleNavigation('websites')}
                            className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-in-out 
                                ${expanding === 'websites' ? 'flex-[10] z-20' : expanding && expanding !== 'websites' ? 'flex-[0.001] opacity-0 pointer-events-none' : 'flex-1 hover:flex-[1.1]'} 
                                bg-[#0a192f] overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 opacity-50" />
                            <div className={`z-10 text-center p-8 transition-all duration-500 ${expanding === 'websites' ? 'scale-150 opacity-0' : 'group-hover:scale-105'}`}>
                                <div className="mb-8 inline-flex p-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                                    <Globe size={40} />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">OkosŐr</h2>
                                <p className="text-xs text-emerald-400 font-bold uppercase tracking-[0.4em] mb-10">Web_Műhely</p>
                                <div className="text-[10px] inline-flex items-center gap-2 text-emerald-500/60 group-hover:text-emerald-300 transition-colors tracking-[0.2em] font-mono">
                                    DEPLOY_PROJECTS <Code2 size={14} />
                                </div>
                            </div>
                        </div>

                        {/* KÖZÉPSŐ OLDAL: SMARTHOME */}
                        <div
                            onClick={() => !expanding && handleNavigation('smarthome')}
                            className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-in-out 
                                ${expanding === 'smarthome' ? 'flex-[10] z-20' : expanding && expanding !== 'smarthome' ? 'flex-[0.001] opacity-0 pointer-events-none' : 'flex-1 hover:flex-[1.1]'} 
                                bg-white overflow-hidden border-x border-zinc-100`}
                        >
                            <div className="absolute inset-0 bg-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className={`z-10 text-center p-8 transition-all duration-500 ${expanding === 'smarthome' ? 'scale-150 opacity-0' : 'group-hover:scale-105'}`}>
                                <div className="mb-8 inline-flex p-6 rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-200 group-hover:rotate-6 transition-transform">
                                    <Home size={40} />
                                </div>
                                <h2 className="text-5xl font-black text-slate-900 mb-2 tracking-tight">OkosŐr</h2>
                                <p className="text-lg text-blue-600 font-bold uppercase tracking-[0.2em] mb-8">Smarthome</p>
                                <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                                    PRÉMIUM AUTOMATIZÁLÁS <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* JOBB OLDAL: 3D MŰHELY */}
                        <div
                            onClick={() => !expanding && handleNavigation('3d')}
                            className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-in-out 
                                ${expanding === '3d' ? 'flex-[10] z-20' : expanding && expanding !== '3d' ? 'flex-[0.001] opacity-0 pointer-events-none' : 'flex-1 hover:flex-[1.1]'} 
                                bg-[#080808] overflow-hidden`}
                        >
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px]" />
                            <div className={`z-10 text-center p-8 transition-all duration-500 ${expanding === '3d' ? 'scale-150 opacity-0' : 'group-hover:scale-105'}`}>
                                <div className="mb-8 inline-flex p-6 rounded-none bg-zinc-900 text-orange-600 border border-zinc-700 shadow-2xl group-hover:-rotate-6 transition-transform">
                                    <Printer3D size={40} />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">OkosŐr</h2>
                                <p className="text-sm text-orange-600 font-bold uppercase tracking-[0.4em] mb-10">3D_Műhely</p>
                                <div className="text-[10px] inline-flex items-center gap-2 text-zinc-500 group-hover:text-orange-500 transition-colors tracking-widest">
                                    [ ADDITÍV_GYÁRTÁS ] <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Content Views */}
                {view === 'smarthome' && (
                    <motion.div key="smarthome-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                        <SmarthomeContent onBack={() => setView('portal')} />
                    </motion.div>
                )}

                {view === '3d' && (
                    <motion.div key="3d-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                        <ThreeDHomeContent onBack={() => setView('portal')} />
                    </motion.div>
                )}

                {view === 'websites' && (
                    <motion.div key="websites-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                        <WebsiteContent onBack={() => setView('portal')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}