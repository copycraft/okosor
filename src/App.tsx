import React, { useEffect, useRef, useState } from 'react';
import {
    Thermometer,
    Shield,
    Zap,
    Menu,
    X,
    Phone,
    Mail
} from 'lucide-react';
import ContactForm from './components/ContactForm';

/* ------------------------------------------
   Types
   ------------------------------------------ */

type Product = {
    id: string;
    title: string;
    description: string;
    features: string[];
    priceRange: string;
    image?: string;
    badge?: string;
};

/* ------------------------------------------
   Utilities
   ------------------------------------------ */

/** stable unique id per component instance */
function useUniqueId(prefix = 'id') {
    const ref = useRef<string | null>(null);
    if (!ref.current) {
        ref.current = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    }
    return ref.current;
}

/* ------------------------------------------
   Small visual components
   ------------------------------------------ */

function HouseLogo({ className = 'h-8 w-8', circleBg = true }: { className?: string; circleBg?: boolean; }) {
    const gradId = useUniqueId('houseGrad');
    return (
        <div
            className={`${className} ${circleBg ? 'rounded-full p-1' : ''}`}
            style={circleBg ? { background: 'var(--primary-bg)' } : undefined}
            aria-hidden
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="h-full w-full block"
                role="img"
                aria-label="OkosŐr logo"
            >
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F87171" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>

                {!circleBg && <rect width="64" height="64" fill="#E0F2FE" />}
                <polygon
                    points="16,32 32,16 48,32 48,48 16,48"
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth="6"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

/* ------------------------------------------
   Hooks: reveal on scroll, active section, parallax
   ------------------------------------------ */

/** Reveal sections when entering viewport (IntersectionObserver) */
function useRevealOnScroll(selector = '.section') {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.classList.add('revealed');
                        obs.unobserve(el);
                    }
                });
            },
            { threshold: 0.12 }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [selector]);
}

/** Track which section is "active" using IntersectionObserver (works great with fixed nav) */
function useActiveSection(sectionIds: string[], setActive: (id: string) => void) {
    useEffect(() => {
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];
        if (!sections.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                // We want the section that is most visible / intersecting
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
                if (visible.length) {
                    setActive(visible[0].target.id);
                }
            },
            {
                root: null,
                threshold: [0.15, 0.3, 0.5, 0.75]
            }
        );

        sections.forEach(s => obs.observe(s));
        return () => obs.disconnect();
    }, [sectionIds.join('|'), setActive]);
}

/** Lightweight parallax hook that exposes a small offset value */
function useParallax(multiplier = 0.12) {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                setOffset(window.scrollY * multiplier);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
        };
    }, [multiplier]);
    return offset;
}

/* ------------------------------------------
   Main App
   ------------------------------------------ */

export default function App(): JSX.Element {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    // Keep a single source of truth for section IDs so hooks and nav stay in sync
    const sectionIds = ['about', 'products', 'services', 'contact'];

    useRevealOnScroll('.section');
    useActiveSection(sectionIds, setActiveSection);
    const heroParallax = useParallax(0.06);

    const NAV_HEIGHT = 72; // px — adjust if your nav height changes

    const products: Product[] = [
        {
            id: 'basic',
            title: 'Alap Biztonság',
            description:
                'Belépő szintű védelem kisebb lakásokhoz, komplett kezdőcsomag.',
            features: [
                '1x okos szerver',
                '1x Zigbee USB stick',
                '3x kültéri mozgásérzékelő',
                '3x beltéri mozgásérzékelő',
                '3x ajtó-/ablakérzékelő',
                'Egyszerű telefonos értesítések'
            ],
            priceRange: '350 000 Ft',
            image: '/images/basic-security.jpg'
        },
        {
            id: 'medium',
            title: 'Családi Biztonság',
            description:
                'Kiegyensúlyozott védelem családi házakhoz — előre összeállított 12 szenzorral és 2 kamerával.',
            features: [
                '1x okos szerver',
                '1x Zigbee USB stick',
                '12x szenzor (beltéri/kültéri, igény szerint)',
                '2x biztonsági kamera',
                'Alap automatizálás és távoli hozzáférés'
            ],
            priceRange: '550 000 Ft',
            image: '/images/simple-security.jpg'
        },
        {
            id: 'strong',
            title: 'Teljes Védelem',
            description:
                'Teljesen testreszabható rendszer: annyi szenzor és kamera, amennyire a ház vagy vállalkozás igényli.',
            features: [
                'Vezetékes és vezeték nélküli szenzorok kombinálása',
                'Tetszőleges számú mozgás- és nyitásérzékelő',
                'Tetszőleges számú biztonsági kamera',
                'Haladó automatizmusok, sziréna és riasztási logika',
                'Skálázható, igény szerint bővíthető'
            ],
            priceRange: 'Ár az igényektől függ',
            image: '/images/strong-security.jpg'
        }
    ];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT + 8; // small gap
            window.scrollTo({ top: y, behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const placeholder = (label: string) =>
        `https://via.placeholder.com/1200x680.png?text=${encodeURIComponent(label)}`;

    // theme variables derived from the logo
    const themeVars: React.CSSProperties = {
        ['--primary-grad-start' as any]: '#F87171',
        ['--primary-grad-end' as any]: '#3B82F6',
        ['--primary-bg' as any]: '#E0F2FE'
    };

    return (
        <div style={themeVars} className="min-h-screen bg-white">
            <style>{`
        :root { --focus-ring: 3px solid rgba(59,130,246,0.12); }
        .focus-ring:focus { outline: var(--focus-ring); outline-offset: 2px; }

        .gradient-text { background: linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end)); -webkit-background-clip: text; background-clip: text; color: transparent; display: inline-block; }

        .brand-pill { background: linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end)); color: white; }

        @keyframes ping-slow { 0% { transform: scale(1); opacity: 1; } 75% { transform: scale(1.8); opacity: 0; } 100% { transform: scale(1.8); opacity: 0; } }
        .ping-slow::after { content: ""; position: absolute; width: 3.25rem; height: 3.25rem; border-radius: 9999px; background: radial-gradient(circle, rgba(248,113,113,0.18), rgba(59,130,246,0.08)); animation: ping-slow 1.8s infinite; pointer-events: none; top: 0; left: 0; transform-origin: center; }

        /* section reveal */
        .section { opacity: 0; transform: translateY(12px); transition: transform 700ms cubic-bezier(.16,.84,.35,1), opacity 700ms ease; }
        .section.revealed { opacity: 1; transform: translateY(0); }

        /* product horizontal scroll snap */
        .scroll-snap-x { scroll-snap-type: x mandatory; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .scroll-snap-item { scroll-snap-align: start; }

        /* ensure headings don't clip */
        .section-heading { display: inline-block; overflow: visible; white-space: normal; }

        /* small responsive niceties */
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
        }
      `}</style>

            {/* NAV */}
            <nav
                className="fixed top-0 w-full z-50"
                style={{
                    height: NAV_HEIGHT,
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.84) 100%)',
                    backdropFilter: 'saturate(120%) blur(6px)',
                    borderBottom: '1px solid rgba(59,130,246,0.06)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-full">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-full p-1" style={{ background: 'var(--primary-bg)' }}>
                                <HouseLogo className="h-9 w-9" circleBg />
                            </div>
                            <span className="text-xl font-bold gradient-text">OkosŐr Szeged</span>
                        </div>

                        <div className="hidden md:flex space-x-8 nav-desktop">
                            {sectionIds.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => scrollToSection(s)}
                                    className={`text-gray-700 hover:text-gray-900 transition focus-ring ${activeSection === s ? 'font-bold gradient-text' : ''}`}
                                >
                                    {s === 'about' && 'Rólunk'}
                                    {s === 'products' && 'Csomagok'}
                                    {s === 'services' && 'Szolgáltatások'}
                                    {s === 'contact' && 'Kapcsolat'}
                                </button>
                            ))}
                        </div>

                        <button className="md:hidden p-2 rounded-md focus-ring" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Toggle menu">
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            {sectionIds.map((s) => (
                                <button key={s} onClick={() => scrollToSection(s)} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition focus-ring">
                                    {s === 'about' && 'Rólunk'}
                                    {s === 'products' && 'Csomagok'}
                                    {s === 'services' && 'Szolgáltatások'}
                                    {s === 'contact' && 'Kapcsolat'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <section className="pt-28 pb-32 bg-gradient-to-br from-blue-50 to-gray-100 section" aria-label="Hero">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    {/* parallax decorative */}
                    <div style={{ transform: `translateY(${heroParallax}px)`, transition: 'transform 200ms linear' }} className="absolute inset-0 pointer-events-none opacity-30 -z-10">
                        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <defs>
                                <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#F8A5A5" />
                                    <stop offset="100%" stopColor="#93C5FD" />
                                </linearGradient>
                            </defs>
                            <path fill="url(#heroGrad)" fillOpacity="0.06" d="M0,160L40,149.3C80,139,160,117,240,106.7C320,96,400,96,480,106.7C560,117,640,139,720,154.7C800,171,880,181,960,170.7C1040,160,1120,128,1200,122.7C1280,117,1360,139,1400,149.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" />
                        </svg>
                    </div>

                    <div className="text-center relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Megfizethető Okos Otthon Megoldások
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-700 mb-4">
                            A legköltséghatékonyabb okos automatizálás Szegeden
                        </p>
                        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                            Professzionális fűtés- és hűtésvezérlés, okosotthon-automatizálás és biztonsági rendszerek — Zigbee és vezetékes opciókkal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                            >
                                Kérjen Ingyenes Árajánlatot
                            </button>
                            <button
                                onClick={() => scrollToSection('services')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-blue-600"
                            >
                                Szolgáltatások Megtekintése
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="py-20 bg-white section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 section-heading">
                            <span className="gradient-text">Rólunk</span>
                        </h2>
                        <div className="w-20 h-1 mx-auto" style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))' }} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Családi Kiválóság</h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">Szegeden élő apa-fia csapat vagyunk, akik szenvedéllyel hozzák el az okosotthon-technológiát minden háztartásba és vállalkozásba.</p>
                            <p className="text-gray-700 mb-4 leading-relaxed">Küldetésünk egyszerű: a legköltséghatékonyabb okosotthon- és biztonsági megoldásokat nyújtani kompromisszumok nélkül a minőségben. Mind Zigbee-s (vezeték nélküli), mind vezetékes rendszereket telepítünk.</p>
                            <p className="text-gray-700 leading-relaxed">Velünk személyre szabott szolgáltatást, helyi szakértelmet és azt a biztonságot kapja, amit egy megbízható családi vállalkozás biztosít.</p>
                        </div>

                        <div className="p-8 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(248,113,113,0.04), rgba(59,130,246,0.04))' }}>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Miért Minket Válasszon?</h3>
                            <ul className="space-y-4">
                                {['Piacvezető árak', 'Helyi Szakértelem', 'Megbízható Technológia', 'Személyre Szabott Szolgáltatás'].map((title, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="rounded-full p-1 mr-3 mt-1" style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))' }}>
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="white" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">{title}</span>
                                            <p className="text-gray-600">
                                                {title === 'Piacvezető árak' && 'Verhetetlen árak, kompromisszum nélkül a minőségben'}
                                                {title === 'Helyi Szakértelem' && 'Szegeden alapítva, büszkén szolgálva a régiót'}
                                                {title === 'Megbízható Technológia' && 'Zigbee és vezetékes rendszerek a nagy megbízhatóságért'}
                                                {title === 'Személyre Szabott Szolgáltatás' && 'Közvetlen kommunikáció a tulajdonosokkal'}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section id="products" className="py-20 bg-white section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 section-heading">
                            <span className="gradient-text">Biztonsági Csomagok</span>
                        </h2>
                        <p className="text-gray-600">Előre összeállított megoldások Zigbee és vezetékes technológiával</p>
                    </div>

                    <div className="overflow-x-auto -mx-4 px-4 md:px-0">
                        <div className="flex gap-6 md:grid md:grid-cols-3 md:gap-8 scroll-snap-x">
                            {products.map(product => (
                                <article id={`product-${product.id}`} key={product.id} className="min-w-[280px] w-[320px] md:w-auto bg-white p-6 rounded-lg shadow hover:shadow-xl transition flex-shrink-0 scroll-snap-item">
                                    <div className="h-44 w-full mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                        <img src={product.image || placeholder(product.title)} alt={product.title} className="object-contain w-full h-full p-2" onError={(e) => { (e.currentTarget as HTMLImageElement).src = placeholder(product.title); }} />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-3">{product.description}</p>

                                    <ul className="text-gray-700 mb-4 space-y-1">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-4 h-4 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-semibold text-gray-900">{product.priceRange}</div>
                                        <button onClick={() => scrollToSection('contact')} className="px-3 py-2 rounded-md text-sm focus-ring" style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))', color: '#fff' }}>
                                            Árajánlat kérése
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="py-20" style={{ background: 'linear-gradient(180deg, rgba(240,249,255,0.8), rgba(255,255,255,1))' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 section-heading">
                            <span className="gradient-text">Szolgáltatásaink</span>
                        </h2>
                        <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))' }} />
                        <p className="text-xl text-gray-600">Megfizethető okos megoldások minden otthonba és vállalkozásba</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#3B82F6' }}>
                                <Thermometer style={{ color: 'white' }} className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fűtés- és Hűtésvezérlés</h3>
                            <p className="text-gray-700 mb-4">Okos termosztátok és klímavezérlés — helyi vezérlés vagy távoli elérés.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center relative">
                            <div className="relative w-16 h-16 mb-6">
                                <div className="absolute inset-0 rounded-full" style={{ background: '#F87171' }} />
                                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                                    <Zap style={{ color: 'white' }} className="h-8 w-8" />
                                </div>
                                <div className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                                    <div className="ping-slow" style={{ width: '100%', height: '100%', borderRadius: '9999px' }} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Okosotthon Automatizálás</h3>
                            <p className="text-gray-700 mb-4">Világítás, kapcsolók, szenzorok, automatizmusok — Zigbee és vezetékes integráció.</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: '#3B82F6' }}>
                                <Shield style={{ color: 'white' }} className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Biztonsági Rendszerek</h3>
                            <p className="text-gray-700 mb-4">Kamerák, mozgásérzékelők, riasztók — vezetékes és Zigbee eszközök telepítése és konfigurálása.</p>
                        </div>
                    </div>

                    <div className="mt-12 p-8 rounded-lg text-center" style={{ background: 'linear-gradient(90deg, rgba(248,113,113,0.04), rgba(59,130,246,0.04))' }}>
                        <h3 className="text-2xl font-bold mb-4">Lakossági és Üzleti Szolgáltatások</h3>
                        <p className="text-lg mb-6 max-w-3xl mx-auto">Otthoni és vállalati telepítések, helyi konfiguráció, adatvédelmi fókusz — nincs „spy” a rendszereinkben.</p>
                        <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-lg font-semibold focus-ring brand-pill" style={{ boxShadow: '0 8px 26px rgba(59,130,246,0.09)' }}>
                            Vegye Fel Velünk a Kapcsolatot
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-20 bg-white section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 section-heading">
                            <span className="gradient-text">Kapcsolat</span>
                        </h2>
                        <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))' }} />
                        <p className="text-gray-600">Kérjen személyre szabott árajánlatot vagy konzultációt</p>
                    </div>

                    <ContactForm />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 bg-gray-900 text-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div style={{ background: 'var(--primary-bg)', padding: 6, borderRadius: 8 }}>
                            <HouseLogo className="h-8 w-8" circleBg />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">OkosŐr Szeged</div>
                            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Minden jog fenntartva.</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a className="text-gray-300 hover:text-white" href="tel:+361234567"><Phone className="h-5 w-5 inline-block" /> <span className="ml-2">+36 1 234 567</span></a>
                        <a className="text-gray-300 hover:text-white" href="mailto:info@okosor.example"><Mail className="h-5 w-5 inline-block" /> <span className="ml-2">info@okosor.example</span></a>
                        <div className="text-gray-400 text-sm">Szeged, Hungary</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
