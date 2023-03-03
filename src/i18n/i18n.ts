import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

// export const locales = {
//   en: 'English',
//   vn: 'Tiếng việt'
// } as const
export enum locales {
  en = 'English',
  vn = 'Tiếng việt'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vn: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}

export const defaultNamespace = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['home,product'],
    defaultNS: defaultNamespace,
    resources,
    lng: 'vn', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'vn',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
