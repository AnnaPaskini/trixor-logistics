
import { ArrowRight, Box, Ruler, Weight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EQUIPMENT_DATA } from '../constants';
import ScrollReveal from './ScrollReveal';

const Equipment: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="equipment" className="py-12 bg-neutral-300 scroll-mt-32">
      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-2">{t('equipment.sectionLabel')}</h2>
            <h3 className="text-4xl font-black text-neutral-900 mb-6">{t('equipment.sectionTitle')}</h3>
            <p className="text-neutral-700">
              {t('equipment.sectionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EQUIPMENT_DATA.map((item) => (
              <div key={item.id} className="group bg-white p-8 rounded-xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 flex flex-col">

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-black uppercase text-neutral-900">{t(`equipment.types.${item.id}.name`)}</h4>
                      <p className="text-neutral-500 font-medium">{t(`equipment.types.${item.id}.subtitle`)}</p>
                    </div>
                    <div className="p-3 bg-neutral-100 rounded-full text-neutral-900 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon size={24} />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="flex items-center gap-2 text-neutral-600 text-sm"><Box size={16} /> {t('equipment.volume')}</span>
                      <span className="font-mono font-bold text-neutral-900">{item.volume}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="flex items-center gap-2 text-neutral-600 text-sm"><Weight size={16} /> {t('equipment.payload')}</span>
                      <span className="font-mono font-bold text-neutral-900">{item.payload}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-100">
                      <span className="flex items-center gap-2 text-neutral-600 text-sm"><Ruler size={16} /> {t('equipment.height')}</span>
                      <span className="font-mono font-bold text-neutral-900">{item.height}</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-6 -mx-8 mb-6 border-y border-neutral-100">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{t('equipment.idealFor')}</p>
                    <ul className="space-y-2">
                      {(t(`equipment.types.${item.id}.idealFor`, { returnObjects: true }) as string[]).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                          <span className="text-primary font-bold">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                  <a href="#contact" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-neutral-900 hover:text-primary transition-colors group-hover:translate-x-2 duration-300">
                    {t('equipment.requestRate')} <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Equipment;
