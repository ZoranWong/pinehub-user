import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import TicketDetail from '../../../models/TicketDetail';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.ticket.detail', TicketDetail);
        this.route = 'user.ticket.detail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
