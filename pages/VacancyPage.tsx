import { ArrowLeft, CheckCircle2, Clock, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { VACANCIES_DATA } from '../constants';

const VacancyPage: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const vacancy = VACANCIES_DATA.find(v => v.id === id);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'b9fb802c-3db0-45e6-ad0e-c2a5d4239533',
                    subject: `New Application: ${vacancy?.title}`,
                    from_name: 'Trixor Careers',
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.message,
                    position: vacancy?.title,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!vacancy) {
        return (
            <section className="min-h-screen bg-neutral-900 pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-white mb-4">Vacancy Not Found</h1>
                    <Link to="/careers" className="text-primary hover:underline">
                        ← {t('vacancies.sectionLabel')}
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-neutral-900 pt-32 pb-24">
            <div className="container mx-auto px-4 md:px-8">

                <Link
                    to="/careers"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    {t('vacancies.sectionLabel')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    <div className="flex flex-col">
                        <div className="rounded-xl overflow-hidden h-64 mb-8">
                            <img
                                src={vacancy.image}
                                alt={vacancy.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 mb-2">
                                {t(`vacancies.jobs.${id}.title`)}
                                <vacancy.icon size={32} className="text-primary" />
                            </h1>
                            <p className="text-lg text-neutral-400">{t(`vacancies.jobs.${id}.type`)}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-neutral-300">
                                <MapPin size={18} className="text-primary" />
                                <span>{t(`vacancies.jobs.${id}.location`)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-neutral-300">
                                <Clock size={18} className="text-primary" />
                                <span>{t(`vacancies.jobs.${id}.type`)}</span>
                            </div>
                        </div>

                        <div className="bg-neutral-800 rounded-xl p-6 flex-grow">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t('vacancies.form.requirements')}</h3>
                            <ul className="space-y-2">
                                {(t(`vacancies.jobs.${id}.requirements`, { returnObjects: true }) as string[]).map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                                        <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 relative overflow-hidden flex flex-col">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                        <div className="relative z-10 flex flex-col flex-grow">
                            {submitted ? (
                                <div className="text-center py-12 flex-grow flex flex-col justify-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={32} className="text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-black text-neutral-900 mb-2">
                                        {t('vacancies.success.title')}
                                    </h2>
                                    <p className="text-neutral-500 mb-6">
                                        <Trans 
                                            i18nKey="vacancies.success.message"
                                            values={{ position: t(`vacancies.jobs.${id}.title`) }}
                                            components={{ strong: <strong /> }}
                                        />
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-neutral-700 font-bold hover:underline"
                                    >
                                        {t('vacancies.success.another')}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-black text-neutral-900 mb-2">{t('vacancies.applyNow')}</h2>
                                    <p className="text-neutral-500 mb-6">{t('vacancies.form.desc')}</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-700 mb-1">{t('vacancies.form.fullName')} *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                                                placeholder={t('vacancies.form.namePlaceholder')}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-neutral-700 mb-1">{t('vacancies.form.phone')} *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                                                placeholder={t('vacancies.form.phonePlaceholder')}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-neutral-700 mb-1">{t('vacancies.form.emailAddress')}</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-neutral-700 mb-1">{t('vacancies.form.message')}</label>
                                            <textarea
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                                                placeholder={t('vacancies.form.messagePlaceholder')}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-4 font-bold uppercase tracking-wider transition-all"
                                        >
                                            <Send size={18} />
                                            {loading ? t('contact.form.sending') : t('vacancies.form.submit')}
                                        </button>
                                    </form>

                                    <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                                        <p className="text-neutral-500 text-sm mb-2">{t('vacancies.form.sendCv')}:</p>
                                        <a
                                            href="mailto:anna.paskini@outlook.com"
                                            className="flex items-center justify-center gap-2 text-primary font-bold hover:underline"
                                        >
                                            <Send size={16} />
                                            anna.paskini@outlook.com
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );

};

export default VacancyPage;