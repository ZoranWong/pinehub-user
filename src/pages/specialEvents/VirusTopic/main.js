import App from './index';
import Vue from 'vue';
import VirusTopic from '../../../models/VirusTopic';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.specialEvents.virusTopic', VirusTopic);
        this.route = 'special.virusTopic';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
