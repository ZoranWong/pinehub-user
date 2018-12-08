import Vue from 'vue';
import App from './index';

const application = wx.$app;
application.setComponent(App).run(function() {
	this.route = 'purchaseShoppingCart';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});