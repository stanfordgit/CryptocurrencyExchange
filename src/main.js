import { createApp } from 'vue';
import App from './App.vue';

/*v-component*/
import '@/assets/styles/main.scss';

import store from '@/store';

const app = createApp(App);
app.use(store);
app.mount('#app');
