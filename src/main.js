import "./style.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import 'primeicons/primeicons.css'
import App from "./App.vue";

import router from './routes'

import DataTableComponent from './components/DataTableComponent.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Tooltip from 'primevue/tooltip';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Skeleton from 'primevue/skeleton'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';

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

app.component('DataTableComponent', DataTableComponent)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Toast', Toast)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Skeleton', Skeleton)
app.component('ConfirmDialog', ConfirmDialog)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('InputNumber', InputNumber)
app.component('Password', Password)

app.use(ToastService);
app.use(ConfirmationService);
app.use(router)
app.mount("#app");
