import App from './App';
//import Vue from 'vue';
import Application from './Application';
//Vue.config.productionTip = false;
App.mpType = 'app';
var application = new Application(App, 'undefined');
application.run(function(){
		
});
