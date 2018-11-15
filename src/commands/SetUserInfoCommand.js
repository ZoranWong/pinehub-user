import Command from './Command';
export default class SetUserInfoCommand extends Command {
  constructor (app) {
    super(app);
  }
  // 获取token值
  async handle (e) {
    let getValue = e.mp.detail;
    let userInfo = getValue.userInfo;
    let signature = getValue.signature;
    let rawData = getValue.rawData;
    let iv = getValue.iv;
    let encryptedData = getValue.encryptedData;
    let accessToken = await this.service('mp.storage').get('accessToken');
    let result = await this.service('http.auth').setUserInfo(accessToken, userInfo, signature, rawData, iv, encryptedData);
    let openId = await this.service('mp.storage').get('openId');
    let token = result.data.token;
    let refreshUserinfo = await this.service('http.auth').getUserInfo(token);

    let userScore = refreshUserinfo.data.can_use_score;
    let refreshTtl = result.data.refresh_ttl;
    let ttl = result.data.ttl;
    token = {
      'value': token,
      'ttl': ttl.date,
      'refreshTtl': refreshTtl.date
    };
    await this.service('mp.storage').set('token', token);

    if (result) {
      let eventData = {
        openId: openId,
        userScore: userScore,
        token: token
      };
      this.store().dispatch('model.account/setAccount', eventData);
      wx.showToast({
        title: '用户信息获取成功',
        icon: 'none'
      })
    }
  }
  static commandName () {
    return 'SET_USERINFO';
  }
}
