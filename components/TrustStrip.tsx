import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Map, Clock, ShieldCheck } from 'lucide-react';

const TrustStrip: React.FC = () => {
  const { t } = useTranslation();
  
  const items = [
    { icon: Truck, title: t('trustStrip.ownFleet.title'), desc: t('trustStrip.ownFleet.desc') },
    { icon: Map, title: t('trustStrip.tracking.title'), desc: t('trustStrip.tracking.desc') },
    { icon: Clock, title: t('trustStrip.dispatch.title'), desc: t('trustStrip.dispatch.desc') },
    { icon: ShieldCheck, title: t('trustStrip.reliable.title'), desc: t('trustStrip.reliable.desc') },
  ];

  return (
    <div className="bg-neutral-100 border-y border-neutral-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-neutral-200">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-8 md:px-6 justify-center md:justify-start">
              <div className="p-3 bg-white border border-neutral-200 rounded-lg text-primary">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-black text-neutral-900 text-sm uppercase tracking-wider">{item.title}</h4>
                <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;