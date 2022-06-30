import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import {pt, en} from './locales'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt,
      en
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;