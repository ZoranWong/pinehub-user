import App from './App';
//import Vue from 'vue';
import Application from './Application';
//Vue.config.productionTip = false;
App.mpType = 'app';
const application = new Application(App);
application.run();
//const app = new Vue(App);
//app.mount(App);
