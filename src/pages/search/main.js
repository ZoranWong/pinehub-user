import App from './index';
import Merchandises from '@/models/Merchandises';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function (app) {
    if (this.models) {
      this.registerModel('model.search.merchandises', Merchandises);
    }

    this.route = 'search';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
