import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import SFMyListCommand from '../commands/SFMyListCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.societyOrderList';
        this.registerCommand(SFMyListCommand.commandName(), SFMyListCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
