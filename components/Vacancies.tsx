import { Banknote, CheckCircle, ChevronRight, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VACANCIES_DATA } from '../constants';
import ScrollReveal from './ScrollReveal';

const Vacancies: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: VACANCIES_DATA[0]?.title || '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="vacancies">
      <div className="bg-neutral-100 py-24">
        <ScrollReveal>
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-16">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('vacancies.sectionLabel')}</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-neutral-900 mb-6">{t('vacancies.sectionTitle')}</h3>
              <p className="text-neutral-500 text-lg mb-8">{t('vacancies.sectionDesc')}</p>
              <div className="flex gap-12">
                <div>
                  <span className="block text-3xl font-black text-neutral-900">55+</span>
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">{t('vacancies.teamMembers')}</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-neutral-900">100%</span>
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-wide">{t('vacancies.modernFleet')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VACANCIES_DATA.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
                  <div className="h-48 bg-neutral-200 overflow-hidden border-b border-neutral-100">
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary">
                        <job.icon size={24} />
                      </div>
                      <h4 className="font-bold text-xl text-neutral-900 leading-tight">{job.title}</h4>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <MapPin size={16} className="text-neutral-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Clock size={16} className="text-neutral-400" />
                        <span>{job.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Banknote size={16} className="text-neutral-400" />
                        <span className="font-bold text-primary">{job.salary}</span>
                      </div><div className="pt-4 border-t border-neutral-100 mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">{t('vacancies.form.requirements')}</p>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                              <span className="text-primary mt-0.5">•</span> {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a href="#apply" className="mt-auto w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider rounded-lg py-3 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                      {t('vacancies.applyNow')} <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div id="apply" className="bg-neutral-900 py-24 border-t border-neutral-800">
        <ScrollReveal>
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-5/12 text-white">
                <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('vacancies.sectionLabel')}</h2>
                <h3 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">{t('vacancies.form.title')}</h3>
                <p className="text-neutral-400 text-lg mb-8">{t('vacancies.form.desc')}</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-800 p-3 rounded-full text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t('vacancies.form.sendCv')}</p>
                      <a href="mailto:jobs@trixor.cz" className="text-lg font-bold hover:text-primary transition-colors">jobs@trixor.cz</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-800 p-3 rounded-full text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{t('vacancies.form.callHr')}</p>
                      <a href="tel:+420226886224" className="text-lg font-bold hover:text-primary transition-colors">+420 226 886 224</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-7/12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{t('vacancies.form.fullName')}</label>
                        <input name="name" type="text" required placeholder={t('vacancies.form.namePlaceholder')} value={formData.name} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors" onChange={handleChange} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{t('vacancies.form.emailAddress')}</label><input name="email" type="email" required placeholder="name@company.com" value={formData.email} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{t('vacancies.form.phone')}</label>
                        <input name="phone" type="tel" placeholder={t('vacancies.form.phonePlaceholder')} value={formData.phone} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors" onChange={handleChange} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{t('vacancies.form.position')}</label>
                        <select name="position" value={formData.position} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors" onChange={handleChange}>
                          {VACANCIES_DATA.map((job) => (
                            <option key={job.id} value={job.title}>{job.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{t('vacancies.form.message')}</label>
                      <textarea name="message" rows={4} placeholder={t('vacancies.form.messagePlaceholder')} value={formData.message} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none" onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider rounded-lg py-4 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                      {t('vacancies.form.submit')} <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div className="bg-white p-10 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-neutral-900 mb-2">{t('vacancies.success.title')}</h4>
                    <p className="text-neutral-500 max-w-sm" dangerouslySetInnerHTML={{ __html: t('vacancies.success.message', { position: formData.position }) }} />

                    <button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-400 hover:text-primary underline">
                      {t('vacancies.success.another')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Vacancies;
