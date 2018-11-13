import Vue from 'vue';
import Application from './Application';
Vue.config.productionTip = false;
App.mpType = 'app';
const application = new Application(App, 'main');
if (typeof wx !== 'undefined') {
  wx['$app'] = application;
}
application.run(function () {

});
