
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EQUIPMENT_DATA } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Helper component for animated numbers
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Skip animation for specific non-countable stats like "24/7"
  const isStatic = value === '24/7';

  useEffect(() => {
    if (isStatic) return;

    // Check if value starts with a number
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTimestamp: number | null = null;

          // Adjust duration based on target size to prevent small numbers from "hanging"
          // Small numbers (e.g. 10) animate faster (1s), larger (55) take longer (up to 2s)
          const duration = Math.min(2000, Math.max(1000, target * 100));

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease Out Cubic: 1 - (1-x)^3 
            const ease = 1 - Math.pow(1 - progress, 3);

            const currentVal = Math.round(target * ease);

            setCount(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target); // exactly on the target
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated, isStatic]);

  // Return static value immediately if flagged
  if (isStatic) return <span>{value}</span>;

  const match = value.match(/^(\d+)(.*)$/);

  // If not a number format we expect, return raw value
  if (!match) return <span>{value}</span>;

  // Render count + suffix (e.g., "+" or "/7")
  return (
    <span ref={elementRef}>
      {hasAnimated ? count : 0}{match[2]}
    </span>
  );
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [activeSegment, setActiveSegment] = useState(EQUIPMENT_DATA[0]);
 useGSAP(() => {
              gsap.from('.hero-title', {
                y: 40,
                opacity: 0,
                duration: 1.3,
                delay: 0.3,
                ease: 'power2.out',
              });
          
              gsap.from('.hero-subtitle', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: 'power2.out',
              });
              gsap.from('.hero-tabs', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.9,
                ease: 'power2.out',
              });
            });

  return (
    <section className="relative min-h-screen flex flex-col pt-24 bg-neutral-900 text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/trixor/video/Trixor hero v2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex-grow flex flex-col justify-center pb-12 md:pb-24">
        <div className="max-w-4xl">
          <div className="inline-block px-1 py-3 text-white text-l font-mono font-bold tracking-widest uppercase mb-6">
            {t('hero.badge')}
          </div>
          <h1 className="hero-title text-5xl md:text-8xl font-black leading-tight mb-6 tracking-tight">
            {t('hero.title')}<span className="inline-block w-4 h-4 md:w-5 md:h-5 bg-primary rounded-full ml-3 relative -bottom-1"></span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-neutral-200 max-w-2xl mb-12 font-light">
            {t('hero.subtitle')} <br />
            {t('hero.subtitleLine2')}
          </p>
        </div>

        {/* UX Segmentation Tabs */}
        <div className="hero-tabs w-full md:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {EQUIPMENT_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSegment(item)}
              className={`p-6 text-left transition-all duration-300 relative group overflow-hidden rounded-xl ${activeSegment.id === item.id
                ? 'bg-neutral-700/80 backdrop-blur-md border-l-4 border-primary'
                : 'bg-neutral-800/60 backdrop-blur-sm hover:bg-neutral-700/60'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-black text-lg tracking-wider uppercase">{item.name}</span>
                <item.icon className={`w-6 h-6 ${activeSegment.id === item.id ? 'text-white' : 'text-neutral-600 group-hover:text-primary'}`} />
              </div>
              <p className={`text-sm ${activeSegment.id === item.id ? 'text-white/90' : 'text-neutral-500'}`}>
                {t(`equipment.types.${item.id}.subtitle`)}
              </p>


            </button>
          ))}
        </div>
        </div>

        {/* Dynamic Details based on Selection */}
        <div className="hero-tabs mt-8 md:mt-12 mb-8 md:mb-16 w-full md:max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center text-lg text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={32} className="text-primary" />
            <span className="text-white font-medium">{t(`equipment.types.${activeSegment.id}.idealFor.0`)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={32} className="text-primary" />
            <span>{t('hero.volume')} <span className="text-white font-mono">{activeSegment.volume}</span></span>
          </div>
          <a href="#contact" className="md:ml-auto flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:text-primary transition-colors group">
            {t('hero.checkAvailability')} <ArrowDown size={32} className="group-hover:translate-y-2 transition-transform" />
          </a>
        </div>
        </div>
      </div>

      {/* Accent Line - Animated */}
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

      {/* Stats Footer */}
      <div className="backdrop-blur md:mt-auto relative z-10 bg-neutral-900/60 shadow-2xl">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-0.5 animate-scan-line opacity-80 z-20"></div>

        <div className="container mx-auto px-12 md:px-8 pt-8 pb-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {['fleetUnits', 'walkingFloors', 'shipments', 'onTime', 'dispatch'].map((key) => (
              <div key={key} className="flex flex-col">
                <span className="text-4xl md:text-6xl font-black text-white font-mono">
                  <AnimatedCounter value={t(`stats.${key}.value`)} />
                </span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">{t(`stats.${key}.label`)}</span>
                <span className="text-xs text-neutral-500">{t(`stats.${key}.subLabel`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
