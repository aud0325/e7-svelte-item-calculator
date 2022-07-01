import { init, getLocaleFromNavigator, register } from 'svelte-i18n';

interface Locale {
    locale: string
    name: string
}

export const locales: Locale[] = 
[
    { locale: 'ko-KR', name: '한국어', },
    { locale: 'en', name: 'English', },
]

export const initI18n = () => {
    locales.forEach((localeInfo) => {
        register(localeInfo.locale, () => import(/* @vite-ignore */`./${localeInfo.locale}.json`));
    })
    // register('ko', () => import('./ko-KR.json'))
    // register('en', () => import('./en.json'))
    
    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
}