import Vue from 'vue';
import App from './index';
import _ from 'underscore';
const application = wx.$app;
application.setComponent(App).run((app) => {}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
