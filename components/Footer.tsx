import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN', flag: 'gb' },
    { code: 'cs', label: 'CS', flag: 'cz' },
    { code: 'ru', label: 'RU', flag: 'ru' },
    { code: 'de', label: 'DE', flag: 'de' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 border-t border-neutral-800 text-sm relative overflow-hidden">
      {/* Big bg footer TRIXOR */}

      {/* Большая фоновая надпись с текстурой и градиентом */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black whitespace-nowrap pointer-events-none select-none leading-none tracking-tighter">
        {/* Слой 1: Градиент текст */}
        <span
          className="bg-gradient-to-b from-neutral-800/20 to-neutral-400/40 bg-clip-text text-transparent"
        >
          TRIXOR
        </span>
      </div>

      {/* Слой 2: Carbon текстура поверх (очень subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black whitespace-nowrap pointer-events-none select-none leading-none tracking-tighter mix-blend-overlay opacity-20"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        TRIXOR
      </div>


      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-neutral-800 flex items-center justify-center font-black text-white text-lg">T</div>
            <span className="font-black text-white text-lg tracking-tighter uppercase">Trixor<span className="text-primary">.</span></span>
          </div>
          <p className="mb-4 text-xs leading-relaxed">
            {t('footer.company.name')}<br />
            {t('footer.company.type')}<br />
            {t('footer.company.country')}
          </p>
          <p className="text-xs">
            {t('footer.company.desc')}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.contact.title')}</h4>
          <p className="mb-2 hover:text-white transition-colors"><a href="tel:+420226886224">+420 226 886 224</a></p>
          <p className="mb-2 hover:text-white transition-colors"><a href="mailto:info@trixor.cz">info@trixor.cz</a></p>
          <p className="mt-4 text-xs text-white transition-color">{t('footer.contact.dispatch')}: +420 777 123 456</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.equipment.title')}</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#equipment" className="hover:text-primary transition-colors">{t('footer.equipment.standard')}</a></li>
            <li><a href="#equipment" className="hover:text-primary transition-colors">{t('footer.equipment.mega')}</a></li>
            <li><a href="#equipment" className="hover:text-primary transition-colors">{t('footer.equipment.bulk')}</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.legal.title')}</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.gdpr')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.rules')}</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white transition-color relative z-10">
        <p>{t('footer.copyright')}</p>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`relative cursor-pointer transition-all p-2 rounded ${
                i18n.language === lang.code
                  ? 'bg-primary ring-2 ring-primary/50'
                  : 'hover:opacity-80'
              }`}
            >
              <img 
                src={`https://flagcdn.com/w20/${lang.flag}.png`}
                srcSet={`https://flagcdn.com/w40/${lang.flag}.png 2x`}
                width="20"
                alt={lang.label}
                className="rounded-sm"
              />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;