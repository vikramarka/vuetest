import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';

import '@/assets/css/style.css';

console.log(router);
const app = createApp(App);
app.use(router);
app.mount('#app');
