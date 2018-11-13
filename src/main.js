import Vue from 'vue';
import Application from './Application';
//Vue.config.productionTip = false;
App.mpType = 'app';
const application = new Application(App, 'undefined');
application.run(function() {

});