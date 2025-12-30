import "./style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import 'primeicons/primeicons.css'
import App from "./App.vue";

import router from './routes'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';                
import Tooltip from 'primevue/tooltip';   
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});

app.directive('tooltip', Tooltip);

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)

app.use(ToastService);
app.use(router)
app.mount("#app");
