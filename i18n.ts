import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import cs from './src/locales/cs/translation.json';
import de from './src/locales/de/translation.json';
import en from './src/locales/en/translation.json';
import ru from './src/locales/ru/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            cs: { translation: cs },
            ru: { translation: ru },
            de: { translation: de },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;