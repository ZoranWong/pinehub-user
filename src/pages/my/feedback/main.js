import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import MyFeedbackService from '@/services/http/MyFeedbackService';
import MyFeedbackCommand from '@/commands/MyFeedbackCommand';
const myFeedback = new Application(App, 'my.feedback');
myFeedback.run((app) => {
	app.register('http.myFeedback', MyFeedbackService);
	app.registerCommand(MyFeedbackCommand.commandName(), MyFeedbackCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});
