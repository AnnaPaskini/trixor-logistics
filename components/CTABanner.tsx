
import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const CTABanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-neutral-900 py-16 relative overflow-hidden">
      <style>
        {`
          @keyframes scan-gradient {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
          .animate-scan-line {
            /* Gradient: Neutral-900 -> Dark Red -> Bright Red -> Dark Red -> Neutral-900 */
            background: linear-gradient(
              90deg, 
              #1A1a1a 0%, 
              #8B1A1F 25%, 
              #ef4444 50%, 
              #8B1A1F 75%, 
              #1A1A1A 100%
            );
            background-size: 200% 100%;
            animation: scan-gradient 3.5s linear infinite;
          }
        `}
      </style>

      {/* Top Accent Line - Animated */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 animate-scan-line opacity-80 z-20"></div>

      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          
          <p className="text-neutral-600 font-bold tracking-[0.2em] uppercase text-xs mb-10">
            {t('cta.trustedBy')}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-80">
              {/* Logos / Placeholders */}
              <div className="text-neutral-500 text-xl font-black tracking-widest hover:text-white transition-colors cursor-default">VOLKSWAGEN</div>
              <div className="text-neutral-500 text-xl font-black tracking-widest hover:text-white transition-colors cursor-default">AUDI</div>
              <div className="text-neutral-500 text-xl font-black tracking-widest hover:text-white transition-colors cursor-default">SKODA</div>
              <div className="text-neutral-500 text-xl font-black tracking-widest hover:text-white transition-colors cursor-default">RENAULT</div>
          </div>
        </div>
      </ScrollReveal>
      
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
    </section>
  );
};

export default CTABanner;
