import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    sk: {
        translation: {
          "Calorie Counter": "Pocitac kalorii",
          "Calories":"Kalorie",
        }
      }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    resources,
    lng: RNLocalize.getLocales()[0].languageCode, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;