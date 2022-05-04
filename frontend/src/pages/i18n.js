import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import translantionEN from "../translations/en.json";
import translationPL from "../translations/pl.json";

const resources = {
  en: {
    translation: translantionEN,
  },
  pl: {
    translation: translationPL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
