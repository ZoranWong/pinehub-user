import App from './index';
import Vue from 'vue';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.activity'
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
