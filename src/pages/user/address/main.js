import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import Address from '../../../models/Address';
import LoadUserAddress from './commands/LoadUserAddress';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.address', Address);
        this.registerCommand(LoadUserAddress.commandName(), LoadUserAddress);
        this.route = 'user.address';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
