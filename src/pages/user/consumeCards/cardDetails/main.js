import App from './index';
import Vue from 'vue';
import LoadCardDetailsCommand from "./command/LoadCardDetailsCommand";

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.cardDetails';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.registerCommand(LoadCardDetailsCommand.commandName(), LoadCardDetailsCommand);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
