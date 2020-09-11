import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import AcquisitionNotActiveCommand from '../../enties/index/commands/AcquisitionNotActiveCommand'
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(AcquisitionNotActiveCommand.commandName(), AcquisitionNotActiveCommand);

        this.route = 'userCenter';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
