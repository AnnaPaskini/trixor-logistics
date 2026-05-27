
import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const FleetEvidence: React.FC = () => {
  const { t } = useTranslation();
  // Helper to handle image errors by switching to a placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Image+Placeholder";
  };

  return (
    <section id="fleet" className="py-24 bg-white relative scroll-mt-32">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>

      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('fleet.sectionLabel')}</h2>
            <h3 className="text-4xl font-black text-neutral-900">{t('fleet.sectionTitle')}</h3>
            <p className="text-neutral-500 mt-4">{t('fleet.sectionDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-[500px]">
            {/* Main Large Image */}
            <div className="lg:col-span-2 md:row-span-2 relative group overflow-hidden bg-neutral-900">
              <img
                src="/trixor/images/TrixorWarehouse.webp"
                alt="Trixor Warehouse"
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent w-full">
                <p className="text-white font-bold uppercase tracking-wider">{t('fleet.images.warehouse.title')}</p>
                <p className="text-neutral-400 text-sm">{t('fleet.images.warehouse.desc')}</p>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="relative group overflow-hidden bg-neutral-900">
              <img
                src="/trixor/images/Trixor1.webp"
                alt="Trixor Fleet"
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent w-full">
                <p className="text-white font-bold uppercase tracking-wider">{t('fleet.images.fleet.title')}</p>
                <p className="text-neutral-400 text-sm">{t('fleet.images.fleet.desc')}</p>
              </div>
            </div>

            <div className="relative group overflow-hidden bg-neutral-900">
              <img
                src="/trixor/images/Mechnik1.webp"
                alt="Fleet Mechanic"
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent w-full">
                <p className="text-white font-bold uppercase tracking-wider">{t('fleet.images.mechanics.title')}</p>
                <p className="text-neutral-400 text-sm">{t('fleet.images.mechanics.desc')}</p>
              </div>
            </div>

            <div className="relative group overflow-hidden bg-neutral-900 md:col-span-2 lg:col-span-2">
              <img
                src="/trixor/images/PHOTO-2025-12-16-10-27-58.webp"
                alt="Trixor Team"
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-neutral-900 to-transparent w-full">
                <p className="text-white font-bold uppercase tracking-wider">{t('fleet.images.team.title')}</p>
                <p className="text-neutral-400 text-sm">{t('fleet.images.team.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FleetEvidence;
