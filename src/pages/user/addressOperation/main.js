import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import AddressOperation from '../../../models/AddressOperation';
import CheckData from './commands/CheckData';
import CreateAddress from './commands/CreateAddress';
import EditAddress from './commands/EditAddress';
import DeleteAddress from './commands/DeleteAddress';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.addressOperation', AddressOperation);
        this.registerCommand(CheckData.commandName(), CheckData);
        this.registerCommand(CreateAddress.commandName(), CreateAddress);
        this.registerCommand(EditAddress.commandName(), EditAddress);
        this.registerCommand(DeleteAddress.commandName(), DeleteAddress);
        this.route = 'user.addressOperation';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
