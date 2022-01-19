import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    sk: {
        translation: {
          "Calorie Counter": "Počítač Kalórií",
          "Calories":"Kalórie",
          "Monday":"Pondelok",
          "Wednesday":"Streda",
          "Thursday":"Štvrtok",
          "Friday":"Piatok",
          "Saturday":"Sobota",
          "Sunday":"Nedeľa",
          "Tuesday":"Utorok",
          "Activity":"Aktivita",
          "Weight":"Váha",
          "You need":"Ešte potrebuješ",
          "Total":"Celkom",
          "of":"z",
          "Protein":"Bielkoviny",
          "Carbohydrates":"Sacharidy",
          "Fat":"Tuky",
          "Fiber":"Vláknina",
          "Foods":"Jedlá",
          "Overview":"Prehľad",
          "Home":"Domov",
          "Search":"Hľadať",
          "Barcode Scanner":"Skener čiarových kódov",
          "Weight Progress":"Štatistika hmotnosti",
          "Preferences":"Nastavenia",
          "Type name of food..":"Napíš názov jedla",
          "Submit":"Potvrď",
          "Details food":"Informácie o jedle",
          "Details food ":"Informácie o jedle ",
          "Quantity":"Množstvo",
          "Energy":"Energia",
          "Update food":"Aktualizácia jedla",
          "Name of activity:":"Názov aktivity:",
          "Calorie (Energy in kcal):":"Kalórie (Energia v kcal):",
          "Add Activity":"Pridať aktivitu",
          "Goals":"Ciele",
          "Nutriments":"Nutrimenty",
          "Gain muscle":"Nabrať svaly",
          "Be fit":"Byť fit",
          "Lose weight":"Ubrať na váhe",
          "Goal":"Cieľ",
          "Set own nutriments":"Nastaviť vlastné nutrimenty",
          "reload":"Znovu načítať",
          "Cancel":"Zrušiť",
          "Add":"Pridať",
          "Update activity":"Aktualizácia aktivity",
          "Remove activity":"Odstrániť aktivitu",
          "Update":"Aktualizuj",
          "Remove food":"Odstráň jedlo",
          "Add food":"Pridať jedlo",
          "Set nutriments":"Potvrdiť",
          "Set goal":"Potvrdiť",
          "":"",
          "":"",


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