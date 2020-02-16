import App from './index';
import Vue from 'vue';
import Pickup from '../../../models/Pickup';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.pickup';
        // this.registerModel('model.user.pickup', Pickup);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
