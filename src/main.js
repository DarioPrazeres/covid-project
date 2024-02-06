import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import CovidData from './components/CovidData.vue';
import ChartPage from './components/ChartPage.vue';

import './index.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ChartPage },
        { path: '/countries', component: CovidData },
    ]
});

const app = createApp(App)

app.use(router);
app.component('chart-page', ChartPage)

app.mount('#app')