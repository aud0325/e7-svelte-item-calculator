import { addMessages, init, getLocaleFromNavigator, register } from 'svelte-i18n';

// import en from './en.json';
// import ko from './ko-KR.json';

export const initI18n = () => {
    register('ko', () => import('./ko-KR.json'))
    register('en', () => import('./en.json'))
    
    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
}