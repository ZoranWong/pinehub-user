import App from './index';
import Vue from 'vue';
// import ActivityService from '@/services/http/ActivityService';
import SetUserMobileCommand from './commands/SetUserMobileCommand';
// import GetActivityInfoCommand from '@/commands/GetActivityInfoCommand';
import LoadTicketsCommand from './commands/LoadTicketsCommand';
import ReceiveTicketCommand from './commands/ReceiveTicketCommand';
import '../../../styles/iconfont.css'
import LoadActivitiesCommand from './commands/LoadActivitiesCommand';
import LoadIndexBannerCommand from './commands/LoadIndexBannerCommand';
import NewIndex from '../../../models/NewIndex';
import LoadPop from './commands/LoadPop';
import LoadCanReceiveTicketsCommand from '../../tickets/ticketCenter/commands/LoadCanReceiveTicketsCommand';
import ReceiveTicketsCommand from '../../tickets/ticketCenter/commands/ReceiveTicketsCommand';
import LoadActivitiesProductsCommand from "./commands/LoadActivitiesProductsCommand";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        // this.register('http.activity', ActivityService);
        // this.registerCommand(GetActivityInfoCommand.commandName(), GetActivityInfoCommand);
        this.registerModel('model.user.newIndex', NewIndex);
        this.registerCommand(LoadTicketsCommand.commandName(), LoadTicketsCommand);
        this.registerCommand(ReceiveTicketCommand.commandName(), ReceiveTicketCommand);
        this.registerCommand(SetUserMobileCommand.commandName(), SetUserMobileCommand);
        this.registerCommand(LoadActivitiesCommand.commandName(), LoadActivitiesCommand);
        this.registerCommand(LoadIndexBannerCommand.commandName(), LoadIndexBannerCommand);
        this.registerCommand(LoadCanReceiveTicketsCommand.commandName(), LoadCanReceiveTicketsCommand);
        this.registerCommand(LoadPop.commandName(), LoadPop);
        this.registerCommand(ReceiveTicketsCommand.commandName(), ReceiveTicketsCommand);
        this.registerCommand(LoadActivitiesProductsCommand.commandName(), LoadActivitiesProductsCommand);
        this.route = 'index';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
