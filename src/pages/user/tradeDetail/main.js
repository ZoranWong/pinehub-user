import App from './index';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.route = 'user.tradeDetail';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
});
export default {
    config: {
        disableSwipeBack: true
    }
}
