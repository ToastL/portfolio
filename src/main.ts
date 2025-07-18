import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

import i18n from './assets/js/i18n'

i18n(createApp(App)).mount('#app')
