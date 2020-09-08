import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
const application = wx.$app;
import SFInsertUserAddressCommand from '../commands/SFInsertUserAddressCommand';
import SFupdateUserAddressCommand from '../commands/SFupdateUserAddressCommand';
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.societyInsertAddress';
        this.registerCommand(SFInsertUserAddressCommand.commandName(), SFInsertUserAddressCommand);
        this.registerCommand(SFupdateUserAddressCommand.commandName(), SFupdateUserAddressCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
