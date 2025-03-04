import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationKO from './locales/ko/translation.json';
import translationJP from './locales/jp/translation.json';
const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },

  jp: { 
    translation: translationJP, 
  },

};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ko',
    supportedLngs: ['en', 'ko', 'jp'],

    // URL 기반 언어 감지를 위한 설정
    detection: {
      lookupFromPathIndex: 0,
    },

    interpolation: {
      escapeValue: false,
  });

export default i18n;
