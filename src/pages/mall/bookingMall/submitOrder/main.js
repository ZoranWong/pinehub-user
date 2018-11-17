import App from './index';
import Merchandises from '@/models/Merchandises';
import MyInfo from '@/models/MyInfo';
import Vue from 'vue';

import MyInfoCommand from '@/commands/MyInfoCommand';
import MyInfoService from '@/services/http/MyInfoService';

const application = wx.$app;
application.setComponent(App).run(function () {
    if (this.models) {
      this.models.addModel('model.activity.merchandises', Merchandises);
      this.models.addModel('model.my.info', MyInfo);
    }
    this.register('http.myInfo', MyInfoService);

    this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
    this.route = 'shopSubmitOrder';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});


