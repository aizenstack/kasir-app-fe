import "./style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import 'primeicons/primeicons.css'
import App from "./App.vue";

import router from './routes'

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});
app.use(router)
app.mount("#app");
