import Vue from 'vue';
import Application from './Application';
<<<<<<< HEAD
import App from './App';
import _ from 'underscore';


const application = new Application(App);
application.run(function(mountComponent) {
	 // _.extend(App,mountComponent);
	 // const app = new Vue(App);
	 // app.$mount();
	 // return app;
});
=======
//Vue.config.productionTip = false;
App.mpType = 'app';
var application = new Application(App, 'undefined');
application.run(function(){
		
});
>>>>>>> 07130b95d588a260b3f4d6dc361f14673c6ddd7b
