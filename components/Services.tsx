import React from 'react';
import { useTranslation } from 'react-i18next';
import { Warehouse, FileCheck, Shield, Repeat } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="py-8 bg-neutral-900 text-neutral-400 border-b border-neutral-800">
      <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-6">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">{t('services.label')}</span>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Warehouse size={16} /> <span className="text-sm font-medium">{t('services.warehousing')}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <FileCheck size={16} /> <span className="text-sm font-medium">{t('services.customs')}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Shield size={16} /> <span className="text-sm font-medium">{t('services.insurance')}</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Repeat size={16} /> <span className="text-sm font-medium">{t('services.crossdocking')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;