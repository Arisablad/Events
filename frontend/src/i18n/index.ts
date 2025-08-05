import i18n from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

type LanguageType = 'en' | 'pl'

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['common'], // default namespace to load at bootstrap
    defaultNS: 'common',
    partialBundledLanguages: true,
    resources: {},
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend(
          (lng: LanguageType, ns: any) =>
            import(`../i18n/locales/${lng}/${ns}.json`),
        ),
      ],
      backendOptions: [{ loadPath: '/locales/{{lng}}/{{ns}}.json' }],
    },
    react: { useSuspense: true },
  })
