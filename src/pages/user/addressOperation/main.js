import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import AddressOperation from '../../../models/AddressOperation';
import CheckData from './commands/CheckData';
import CreateAddress from './commands/CreateAddress';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.addressOperation', AddressOperation);
        this.registerCommand(CheckData.commandName(), CheckData);
        this.registerCommand(CreateAddress.commandName(), CreateAddress);
        this.route = 'user.addressOperation';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
