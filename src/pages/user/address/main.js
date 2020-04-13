import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import Address from '../../../models/Address';
import LoadUserAddress from './commands/LoadUserAddress';
import SelectAddressCommand from '../../activities/QingSongKungfu/commands/SelectAddressCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.address', Address);
        this.registerCommand(LoadUserAddress.commandName(), LoadUserAddress);
        this.registerCommand(SelectAddressCommand.commandName(), SelectAddressCommand);
        this.route = 'user.address';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
