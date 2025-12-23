import { ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { VACANCIES_DATA } from '../constants';

const CareersPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="min-h-screen bg-neutral-900 pt-48 pb-24">
            <ScrollReveal>
                <div className="container mx-auto px-4 md:px-8">

                    {/* Header */}
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('vacancies.sectionLabel')}</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                            {t('vacancies.sectionTitle')}
                        </h3>
                        <p className="text-neutral-400">
                            {t('vacancies.sectionDesc')}
                        </p>
                    </div>

                    {/* Vacancy Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {VACANCIES_DATA.map((vacancy) => (
                            <div key={vacancy.id} className="group bg-white rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">

                                {/* Image */}
                                <div className="h-80 overflow-hidden">
                                    <img
                                        src={vacancy.image}
                                        alt={vacancy.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    {/* Title */}
                                    <div className="mb-6">
                                        <h4 className="text-2xl font-black uppercase text-neutral-900 flex items-center gap-2">
                                            {t(`vacancies.jobs.${vacancy.id}.title`)}
                                            <vacancy.icon size={24} className="text-primary" />
                                        </h4>
                                        <p className="text-neutral-500 font-medium">{t(`vacancies.jobs.${vacancy.id}.type`)}</p>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                                            <MapPin size={16} className="text-primary" />
                                            <span>{t(`vacancies.jobs.${vacancy.id}.location`)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                                            <Clock size={16} className="text-primary" />
                                            <span>{t(`vacancies.jobs.${vacancy.id}.type`)}</span>
                                        </div>
                                    </div>

                                    {/* Requirements */}
                                    <div className="bg-neutral-50 p-6 -mx-8 mb-6 border-y border-neutral-100">
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t('vacancies.form.requirements')}</p>
                                        <ul className="space-y-2">
                                            {(t(`vacancies.jobs.${vacancy.id}.requirements`, { returnObjects: true }) as string[]).map((req, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                                                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-auto">
                                        <Link
                                            to={`/careers/${vacancy.id}`}
                                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 font-bold uppercase tracking-wider transition-all"
                                        >
                                            {t('vacancies.applyNow')} <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </ScrollReveal>
        </section>
    );
};

export default CareersPage;