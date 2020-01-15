import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import QSKungfu from '../../../models/QSKungfu';
import LoadUserAddress from './commands/LoadUserAddress';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.QSKungfu', QSKungfu);
        // this.registerCommand(LoadUserAddress.commandName(), LoadUserAddress);
        this.route = 'user.QingSongKungfu';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
