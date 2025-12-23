
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-neutral-900 py-48 border-t border-neutral-800 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10">
             <span className="inline-block px-10 py-3 border border-primary/50 bg-neutral-900/50 text-white text-l font-mono font-bold tracking-widest uppercase">
               {t('about.title')}
             </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed text-center lg:text-left">
                <Trans 
                  i18nKey="about.intro" 
                  components={{ strong: <span className="text-white font-bold" /> }} 
                />
              </p>
              
              <p className="text-lg md:text-xl font-light text-neutral-500 leading-relaxed text-center lg:text-left">
                {t('about.history')}
              </p>

              <blockquote className="text-lg md:text-xl font-light text-neutral-400 leading-relaxed italic border-l-4 border-primary pl-6 pt-4 text-center lg:text-left">
                "{t('about.quote')}"
              </blockquote>
              
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider text-center lg:text-left">
                — {t('about.quoteAuthor')}
              </p>
              
              <div className="mt-12 w-24 h-1 bg-neutral-800 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800 shadow-2xl">
                <img
                  src="/trixor/images/Jura 4.png"
                  alt="Trixor Fleet"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
