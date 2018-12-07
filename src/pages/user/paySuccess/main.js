import App from '.';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.route = 'myOrderSuccess';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
