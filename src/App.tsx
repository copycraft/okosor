import { useState } from 'react';
import {
    Home,
    Thermometer,
    Shield,
    Zap,
    Phone,
    Mail,
    MapPin,
    Menu,
    X
} from 'lucide-react';
import ContactForm from './components/ContactForm';

type Product = {
    id: string;
    title: string;
    description: string;
    features: string[];
    priceRange: string;
    image?: string; // path under /public/images or absolute URL
    badge?: string;
};

export default function App(): JSX.Element {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const products: Product[] = [
        {
            id: 'basic',
            title: 'Alap Biztonság',
            description:
                'Belépő szintű védelem kisebb lakásokhoz. Telepíthető Zigbee-s (vezeték nélküli) és hagyományos vezetékes érzékelőkkel is.',
            features: [
                'Központi vezérlő (Zigbee vagy vezetékes opció)',
                '1x mozgásérzékelő',
                '1x ajtó-/ablakérzékelő',
                'Egyszerű telefonos értesítések'
            ],
            priceRange: '200–300 ezer Ft',
            image: '/images/basic-security.jpg'
        },
        {
            id: 'simple',
            title: 'Családi Biztonság',
            description:
                'Kiegyensúlyozott védelem családi házakhoz — hibrid (Zigbee + vezetékes) megoldással, bővíthető érzékelőkkel.',
            features: [
                'Zigbee + vezetékes hibrid kialakítás',
                'Több mozgásérzékelő',
                'Ajtó- és ablakérzékelők',
                'Alap automatizálás és távoli hozzáférés'
            ],
            priceRange: '400–500 ezer Ft',
            image: '/images/simple-security.jpg'
        },
        {
            id: 'strong',
            title: 'Teljes Védelem',
            description:
                'Professzionális, bővíthető rendszer teljes ingatlanvédelemhez. Vezetékes és vezeték nélküli szenzorok kombinálhatók.',
            features: [
                'Teljes érzékelő lefedettség',
                'Vezetékes + vezeték nélküli szenzorok',
                'Haladó automatizmusok, sziréna és riasztási logika',
                'Skálázható, igény szerint bővíthető'
            ],
            priceRange: '500–800 ezer Ft (érzékelők számától függ)',
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

    return (
        <div className="min-h-screen bg-white">
            <nav className="fixed top-0 w-full bg-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Home className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">OkosŐr Szeged</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Rólunk
                            </button>
                            <button
                                onClick={() => scrollToSection('products')}
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Csomagok
                            </button>
                            <button
                                onClick={() => scrollToSection('services')}
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Szolgáltatások
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Kapcsolat
                            </button>
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            <button
                                onClick={() => scrollToSection('about')}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition"
                            >
                                Rólunk
                            </button>
                            <button
                                onClick={() => scrollToSection('products')}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition"
                            >
                                Csomagok
                            </button>
                            <button
                                onClick={() => scrollToSection('services')}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition"
                            >
                                Szolgáltatások
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition"
                            >
                                Kapcsolat
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
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

            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Rólunk</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Családi Kiválóság</h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Szegeden élő apa-fia csapat vagyunk, akik szenvedéllyel hozzák el az okosotthon-technológiát minden háztartásba és vállalkozásba.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Küldetésünk egyszerű: a legköltséghatékonyabb okosotthon- és biztonsági megoldásokat nyújtani kompromisszumok nélkül a minőségben. Mind Zigbee-s (vezeték nélküli), mind vezetékes rendszereket telepítünk.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Velünk személyre szabott szolgáltatást, helyi szakértelmet és azt a biztonságot kapja, amit egy megbízható családi vállalkozás biztosít.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-8 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Miért Minket Válasszon?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Piacvezető árak</span>
                                        <p className="text-gray-600">Verhetetlen árak, kompromisszum nélkül a minőségben</p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Helyi Szakértelem</span>
                                        <p className="text-gray-600">Szegeden alapítva, büszkén szolgálva a régiót</p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Megbízható Technológia</span>
                                        <p className="text-gray-600">Zigbee és vezetékes rendszerek a nagy megbízhatóságért</p>
                                    </div>
                                </li>

                                <li className="flex items-start">
                                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-900">Személyre Szabott Szolgáltatás</span>
                                        <p className="text-gray-600">Közvetlen kommunikáció a tulajdonosokkal</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS SECTION */}
            <section id="products" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Biztonsági Csomagok</h2>
                        <p className="text-gray-600">Előre összeállított megoldások Zigbee és vezetékes technológiával</p>
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
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = placeholder(product.title);
                                            }}
                                        />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-3">{product.description}</p>

                                    <ul className="text-gray-700 mb-4 space-y-1">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-4 h-4 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-semibold text-gray-900">{product.priceRange}</div>
                                        <button
                                            onClick={() => scrollToSection('contact')}
                                            className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                                        >
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
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Szolgáltatásaink</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Megfizethető okos megoldások minden otthonba és vállalkozásba</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Thermometer className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fűtés- és Hűtésvezérlés</h3>
                            <p className="text-gray-700 mb-4">
                                Okos termosztátok és klímavezérlés — helyi vezérlés vagy távoli elérés.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Zap className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Okosotthon Automatizálás</h3>
                            <p className="text-gray-700 mb-4">
                                Világítás, kapcsolók, szenzorok, automatizmusok — Zigbee és vezetékes integráció.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Biztonsági Rendszerek</h3>
                            <p className="text-gray-700 mb-4">
                                Kamerák, mozgásérzékelők, riasztók — vezetékes és Zigbee eszközök telepítése és konfigurálása.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-600 text-white p-8 rounded-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">Lakossági és Üzleti Szolgáltatások</h3>
                        <p className="text-lg mb-6 max-w-3xl mx-auto">
                            Otthoni és vállalati telepítések, helyi konfiguráció, adatvédelmi fókusz — nincs „spy” a rendszereinkben.
                        </p>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Vegye Fel Velünk a Kapcsolatot
                        </button>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kapcsolat</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">Vegye fel velünk a kapcsolatot ingyenes konzultáció vagy árajánlat céljából</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Lépjen Kapcsolatba Velünk</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                                        <p className="text-gray-700">+36 20 454 5501</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-700">info@okosor.hu</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <MapPin className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Cím</h4>
                                        <p className="text-gray-700">Szeged, Magyarország</p>
                                        <p className="text-gray-600 text-sm mt-1">Szeged és környéke kiszolgálása</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Home className="h-6 w-6 text-blue-400" />
                                <span className="text-lg font-bold">OkosŐr Szeged</span>
                            </div>
                            <p className="text-gray-400">Megbízható partner az okosotthon- és biztonsági megoldások terén Szegeden és környékén.</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Gyors Linkek</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition">Rólunk</button>
                                </li>
                                <li>
                                    <button onClick={() => scrollToSection('products')} className="text-gray-400 hover:text-white transition">Csomagok</button>
                                </li>
                                <li>
                                    <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition">Szolgáltatások</button>
                                </li>
                                <li>
                                    <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition">Kapcsolat</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Szolgáltatásaink</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Fűtés- és Hűtésvezérlés</li>
                                <li>Okosotthon Automatizálás</li>
                                <li>Biztonsági Rendszerek (Zigbee & vezetékes)</li>
                                <li>Zigbee Eszköz Telepítés</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2026 Vastag Péter EV. Minden jog fenntartva.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
