import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import LoadIntegralRecordsCommand from './commands/LoadIntegralRecordsCommand';
import IntegralRecords from '../../../models/IntegralRecords';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.integral.records', IntegralRecords);
        this.route = 'user.integral.records';
        this.registerCommand(LoadIntegralRecordsCommand.commandName(), LoadIntegralRecordsCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
