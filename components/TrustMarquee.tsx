
import React from 'react';
import { useTranslation } from 'react-i18next';

const TrustMarquee: React.FC = () => {
  const { t } = useTranslation();
  const ITEMS = t('marquee.items', { returnObjects: true }) as string[];
  return (
    <div className="w-full bg-neutral-800 border-y border-neutral-700 overflow-hidden py-10 relative z-20">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 100s linear infinite;
          }
        `}
      </style>
      <div className="animate-marquee whitespace-nowrap">
        {/* Generate multiple sets to ensure seamless looping on large screens */}
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {ITEMS.map((item, i) => (
              <div key={`${setIndex}-${i}`} className="flex items-center">
                <span className="text-neutral-300 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                  {item}
                </span>
                <span className="text-primary mx-10 md:mx-14"> ● </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustMarquee;
