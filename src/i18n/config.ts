import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationKO from './locales/ko/translation.json';
import translationJP from './locales/jp/translation.json';
import translationJP from './locales/jp/translation.json';

<re.Match object; span=(381, 544), match="const resources = {\n  en: {\n    translation: tr>

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    <re.Match object; span=(582, 615), match="supportedLngs: ['en', 'ko', 'jp']">,
    
    // URL 기반 언어 감지를 위한 설정
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 
