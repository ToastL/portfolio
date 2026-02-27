import i18next from "i18next";
import I18NextVue from 'i18next-vue';
import LanguageDetector from 'i18next-browser-languagedetector';

import type { App } from "vue";

import en from "./locales/en.json";
import nl from "./locales/nl.json";

i18next
    .use(LanguageDetector)
    .init({
        debug: import.meta.env.DEV,
        fallbackLng:'nl',
        resources: {
            en,
            nl
        }
    })

export default function (app: App<Element>) {
    app.use(I18NextVue, { i18next })
    return app
}