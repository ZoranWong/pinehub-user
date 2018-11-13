import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import GatherOrderService from '../../../../services/http/GatherOrderService';
import GatherOrderCommand from '@/commands/GatherOrderCommand';
import GatherOrder from '@/models/GatherOrder';
const application = wx.$app;
application.setComponent(App).run((app) => {
    app.registerModel('model.gather.orders', GatherOrder);
    app.register('http.gatherOrder', GatherOrderService);
    app.registerCommand(GatherOrderCommand.commandName(), GatherOrderCommand);
}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
