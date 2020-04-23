import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.list';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
