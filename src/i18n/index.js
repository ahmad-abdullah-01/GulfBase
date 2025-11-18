import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

const resources = {
  en: { translation: en },
  ar: { translation: ar }
}

i18n.use(initReactI18next).init(
  {
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  }
)

export default i18n