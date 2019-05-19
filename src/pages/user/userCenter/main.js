import App from './index';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function () {
    this.route = 'userCenter';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
});
