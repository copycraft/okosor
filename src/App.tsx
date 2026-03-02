// App.tsx
import React, { useRef, useState} from 'react';
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

type Product = {
    id: string;
    title: string;
    description: string;
    features: string[];
    priceRange: string;
    image?: string;
    badge?: string;
};

/** stable unique id per component instance */
function useUniqueId(prefix = 'id') {
    const ref = useRef<string | null>(null);
    if (!ref.current) {
        ref.current = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    }
    return ref.current;
}

/** Reusable HouseLogo. If circleBg is true we rely on the container's rounded background
 *  (so no inner square rect shows up). Each instance gets a unique gradient id.
 */
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

                {/* If circleBg is true we omit the square rect so rounded container is visible */}
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

export default function App(): JSX.Element {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // NEW: privacy section visibility (the whole section under the hero)
    const [showPrivacySection, setShowPrivacySection] = useState(true);

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
            el.scrollIntoView({ behavior: 'smooth' });
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
            {/* small scoped CSS: gradient-text used sparingly; ping-slow for subtle effect */}
            <style>{`
        :root {
          --focus-ring: 3px solid rgba(59,130,246,0.12);
        }
        .focus-ring:focus {
          outline: var(--focus-ring);
          outline-offset: 2px;
        }

        .gradient-text {
          background: linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        /* subtle brand pill for buttons / badges */
        .brand-pill {
          background: linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end));
          color: white;
        }

        /* slower ping for middle service */
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .ping-slow::after {
          content: "";
          position: absolute;
          width: 3.25rem; /* 52px (matches icon container) */
          height: 3.25rem;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(248,113,113,0.18), rgba(59,130,246,0.08));
          animation: ping-slow 1.8s infinite;
          pointer-events: none;
          top: 0;
          left: 0;
          transform-origin: center;
        }

        /* ensure H2 headings don't clip */
        .section-heading {
          display: inline-block;
          overflow: visible;
          white-space: normal;
        }

        /* small responsive tweak for disclaimer height */
        @media (min-width: 640px) {
          .disclaimer-height { height: 48px; }
        }
      `}</style>
            {/* NAV */}
            <nav
                className="fixed w-full z-50"
                style={{
                    top : '0px',
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.76) 100%)',
                    backdropFilter: 'saturate(120%) blur(6px)',
                    borderBottom: '1px solid rgba(59,130,246,0.06)'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-full p-1" style={{ background: 'var(--primary-bg)' }}>
                                <HouseLogo className="h-9 w-9" circleBg />
                            </div>
                            <span className="text-xl font-bold gradient-text">OkosŐr Szeged</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-gray-900 transition focus-ring">Rólunk</button>
                            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-gray-900 transition focus-ring">Csomagok</button>
                            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-gray-900 transition focus-ring">Szolgáltatások</button>
                            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-gray-900 transition focus-ring">Kapcsolat</button>
                        </div>

                        <button className="md:hidden p-2 rounded-md focus-ring" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Toggle menu">
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition focus-ring">Rólunk</button>
                            <button onClick={() => scrollToSection('products')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition focus-ring">Csomagok</button>
                            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition focus-ring">Szolgáltatások</button>
                            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition focus-ring">Kapcsolat</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <section className="pt-24 pb-32 bg-gradient-to-br from-blue-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
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

            {/* NEW: FULL PRIVACY / NO 3RD-PARTY SECTION directly under HERO */}
            {showPrivacySection && (
                <section id="privacy" className="py-8 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-xl p-6 md:p-8 shadow-md"
                             style={{ background: 'linear-gradient(90deg, rgba(248,113,113,0.02), rgba(59,130,246,0.02))' }}>
                            <div className="flex flex-col md:flex-row md:items-start md:gap-6">

                                <div className="flex-shrink-0 mb-4 md:mb-0">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                                         style={{ background: '#3B82F6' }}>
                                        <Shield style={{ color: 'white' }} className="h-7 w-7" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Semmit sem küldünk harmadik félnek
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Nálunk az adataid helyben maradnak...
                                    </p>

                                    <ul className="grid gap-3 md:grid-cols-3 text-gray-700">
                                        <li>
                                            <strong className="block text-gray-900">Helyi feldolgozás</strong>
                                            Adatok helyben kerülnek feldolgozásra.
                                        </li>
                                        <li>
                                            <strong className="block text-gray-900">Nincs 3rd-party tracking</strong>
                                            Nem használunk külső analitikát.
                                        </li>
                                        <li>
                                            <strong className="block text-gray-900">Opciók és átláthatóság</strong>
                                            Külső szolgáltatás csak jóváhagyással.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                                    <button
                                        onClick={() => scrollToSection('contact')}
                                        className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-800 font-medium"
                                    >
                                        Több infó / Kapcsolat
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ABOUT */}
            <section id="about" className="py-20 bg-white">
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
                            <p className="text-gray-700 mb-4 leading-relaxed">Küldetésünk egyszerű: a legköltséghatékonyabb okosotthon- és biztonsági megoldásokat nyújtani kompromisszumok nélküli minőségben. Mind Zigbee-s (vezeték nélküli), mind vezetékes rendszereket telepítünk.</p>
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
            <section id="products" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 section-heading">
                            <span className="gradient-text inline-block pb-1">Biztonsági Csomagok</span>
                        </h2>
                        <p className="text-gray-600 mt-4">Előre összeállított megoldások Zigbee és vezetékes technológiával</p>
                    </div>

                    <div className="overflow-x-auto -mx-4 px-4 md:px-0">
                        <div className="flex gap-6 md:grid md:grid-cols-3 md:gap-8">
                            {products.map(product => (
                                <article
                                    id={`product-${product.id}`}
                                    key={product.id}
                                    className="min-w-[280px] w-[320px] md:w-auto bg-white p-6 rounded-lg shadow hover:shadow-xl transition flex-shrink-0"
                                >
                                    <div className="h-44 w-full mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                        <img
                                            src={product.image || placeholder(product.title)}
                                            alt={product.title}
                                            className="object-contain w-full h-full p-2"
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = placeholder(product.title); }}
                                        />
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
                                        <div className="text-lg font-semibold text-gray-900">{product.priceRange}*</div>
                                        <button
                                            onClick={() => scrollToSection('contact')}
                                            className="px-3 py-2 rounded-md text-sm focus-ring"
                                            style={{ background: 'linear-gradient(90deg, var(--primary-grad-start), var(--primary-grad-end))', color: '#fff' }}
                                        >
                                            Árajánlat kérése
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Note at the bottom */}
                    <p className="text-sm text-gray-500 mt-4 text-center">Az árainkban a felszerelés nincs benne</p>
                </div>
            </section>

            {/* SERVICES (left/right: solid blue; middle: gradient + ping) */}
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
                                {/* solid pink background */}
                                <div className="absolute inset-0 rounded-full" style={{ background: '#F87171' }} />
                                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                                    <Zap style={{ color: 'white' }} className="h-8 w-8" />
                                </div>
                                {/* ping effect */}
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
            <section id="contact" className="py-20 bg-white">
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

            {/* FOOTER (brand text readable on dark background) */}
            <footer className="py-8 bg-gray-900 text-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div style={{ background: 'var(--primary-bg)', padding: 6, borderRadius: 8 }}>
                            <HouseLogo className="h-8 w-8" circleBg />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">OkosŐr Szeged</div>
                            <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Minden jog fenntartva (Vastag Péter E.V.).</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a className="text-gray-300 hover:text-white" href="tel:+36204545501"><Phone className="h-5 w-5 inline-block" /> <span className="ml-2">+36 20 454 5501</span></a>
                        <a className="text-gray-300 hover:text-white" href="mailto:info@okosor.hu"><Mail className="h-5 w-5 inline-block" /> <span className="ml-2">info@okosor.hu</span></a>
                        <div className="text-gray-400 text-sm">Szeged, Hungary</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}