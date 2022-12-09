import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from '../locales/en.json'
import amharic from '../locales/am.json'

const resources = {
  en: {
    translation: {
      ...english
    }
  },
  am: {
    translation: {
        ...amharic
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    fallbackLng: 'en'
  });

  export default i18n;