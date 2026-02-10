import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([formData]);

            if (error) throw error;

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });

            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } catch (error) {
            console.error('Hiba a küldés során:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Üzenet Küldése</h3>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">Köszönjük az üzenetét!</p>
                    <p className="text-green-700 text-sm mt-1">A lehető leghamarabb válaszolunk.</p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">Valami hiba történt.</p>
                    <p className="text-red-700 text-sm mt-1">Kérjük, próbálja újra vagy vegye fel velünk a kapcsolatot közvetlenül.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Teljes Név *
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                        placeholder="Az Ön neve"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Cím *
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                        placeholder="email@pelda.hu"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefonszám *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                        placeholder="+36 XX XXX XXXX"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Üzenet *
                    </label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition resize-none"
                        placeholder="Meséljen az elképzeléséről vagy kérdezzen..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    <span>{isSubmitting ? 'Küldés...' : 'Üzenet Küldése'}</span>
                    {!isSubmitting && <Send className="h-5 w-5" />}
                </button>

                <p className="text-sm text-gray-600 text-center">
                    * Minden mező kitöltése kötelező
                </p>
            </form>
        </div>
    );
}
