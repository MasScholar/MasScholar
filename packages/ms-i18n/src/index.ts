import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import enES from './locales/en-ES.json'
import jaJP from './locales/ja-JP.json'
import zhCN from './locales/zh-CN.json'
import deDE from './locales/de-DE.json'
import frFR from './locales/fr-FR.json'
import ptBR from './locales/pt-BR.json'
import zhHant from './locales/zh-Hant.json'

type MessageSchema = typeof zhCN

export type LocaleType = 'en-US' | 'en-ES' | 'ja-JP' | 'zh-CN' | 'de-DE' | 'fr-FR' | 'pt-BR' | 'zh-Hant'

export const locales: Record<LocaleType, any> = {
  'en-US': enUS,
  'en-ES': enES,
  'ja-JP': jaJP,
  'zh-CN': zhCN,
  'de-DE': deDE,
  'fr-FR': frFR,
  'pt-BR': ptBR,
  'zh-Hant': zhHant,
}

export const i18n = createI18n<[MessageSchema], LocaleType>({
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: locales
})
