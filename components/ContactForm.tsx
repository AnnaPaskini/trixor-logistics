
import { CheckCircle, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    loading: '',
    unloading: '',
    cargoType: 'Standard',
    weight: '',
    email: ''
  });

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
          subject: `Rate Request: ${formData.loading} → ${formData.unloading}`,
          from_name: 'Trixor Rate Request',
          loading_city: formData.loading,
          unloading_city: formData.unloading,
          cargo_type: formData.cargoType,
          weight: formData.weight,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-neutral-900 py-24 border-t border-neutral-800 scroll-mt-40 relative overflow-hidden">
      
      <style>
        {`
          @keyframes causticFloat {
            0%, 100% {
              transform: translate(0%, 0%) scale(1);
              opacity: 0.7;
            }
            25% {
              transform: translate(60%, 20%) scale(1.1);
              opacity: 1;
            }
            50% {
              transform: translate(40%, 50%) scale(0.95);
              opacity: 0.6;
            }
            75% {
              transform: translate(10%, 30%) scale(1.15);
              opacity: 0.9;
            }
          }
        `}
      </style>

      <div 
        className="absolute top-[-20%] left-[-20%] w-[90%] h-[110%] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)',
          filter: 'blur(35px)',
          animation: 'causticFloat 14s ease-in-out infinite'
        }}
      />

      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Left Column: Copy */}
            <div className="lg:w-5/12 text-white">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('contact.sectionLabel')}</h2>
              <h3 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                {t('contact.sectionTitle')}
              </h3>
              <p className="text-neutral-400 text-lg mb-8">
                {t('contact.sectionDesc')}
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-primary/20 p-1 rounded-full text-primary"><CheckCircle size={16} /></div>
                  <span className="font-medium">{t('contact.benefits.response')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary/20 p-1 rounded-full text-primary"><CheckCircle size={16} /></div>
                  <span className="font-medium">{t('contact.benefits.directFleet')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary/20 p-1 rounded-full text-primary"><CheckCircle size={16} /></div>
                  <span className="font-medium">{t('contact.benefits.pricing')}</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-7/12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('contact.form.loading')}</label>
                      <input
                        required
                        name="loading"
                        type="text"
                        placeholder={t('contact.form.loadingPlaceholder')}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('contact.form.unloading')}</label>
                      <input
                        required
                        name="unloading"
                        type="text"
                        placeholder={t('contact.form.unloadingPlaceholder')}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('contact.form.cargoType')}</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Standard', 'Mega', 'Bulk'].map((type) => (
                        <label key={type} className={`cursor-pointer border rounded-lg p-4 text-center font-bold transition-all ${formData.cargoType === type ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'}`}>
                          <input
                            type="radio"
                            name="cargoType"
                            value={type}
                            checked={formData.cargoType === type}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {t(`contact.cargoTypes.${type.toLowerCase()}`)}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('contact.form.weight')}</label>
                      <input
                        name="weight"
                        type="number"
                        placeholder={t('contact.form.weightPlaceholder')}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{t('contact.form.email')}</label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider rounded-lg py-4 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t('contact.form.sending') : t('contact.form.submit')} <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="bg-white p-10 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-neutral-900 mb-2">
                    {t('contact.success.title')}
                  </h4>
                  <p className="text-neutral-500 max-w-sm">
                    <Trans 
                      i18nKey="contact.success.message"
                      values={{ from: formData.loading, to: formData.unloading, email: formData.email }}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-400 hover:text-primary underline"
                  >
                    {t('contact.success.another')}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ContactForm;
