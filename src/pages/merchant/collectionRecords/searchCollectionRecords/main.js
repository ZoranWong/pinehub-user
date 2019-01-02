import App from './index';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.route = 'merchant.searchCollectionRecords';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});