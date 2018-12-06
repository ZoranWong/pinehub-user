import App from './index';
import GatherOrder from '@/models/Orders';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.route = 'myStoreStockPurchase';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});