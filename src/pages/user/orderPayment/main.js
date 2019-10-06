import App from './index';
import Vue from 'vue';
import OrderPayment from '@/models/OrderPayment';
import '../../../styles/iconfont.css'
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.order.payment', OrderPayment);
        this.route = 'user.order.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
