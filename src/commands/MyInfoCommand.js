import Command from './Command';
export default class MyInfoCommand extends Command {
  constructor (app) {
    super(app);
  }

  async handle () {
    let hasStore = false;
    let response = await this.service('http.auth').getUserInfo();
    let userInfo = response.data;
    if (userInfo.shop_id) {
      hasStore = true;
      await this.service('mp.storage').set('shopId', userInfo.shop_id);
    } else {
      hasStore = false;
    }
    this.store().dispatch({
      type: 'model.my.info/userInfo',
      userInfo: userInfo,
      hasStore: hasStore
    });
  }
  static commandName () {
    return 'MYINFO';
  }
}
