import Command from '@/commands/Command';
export default class SetUserMobileCommand extends Command {
  async handle (e) {
    let detial = e.mp.detail;
    let iv = detial.iv;
    let encryptedData = detial.encryptedData;
    let token = await this.service('mp.storage').get('token')['token'];
    let accessToken = await this.service('mp.storage').get('accessToken');
    let result = await this.service('http.auth').setMobile(encryptedData, iv, token, accessToken);
    let mobile = result.mobile;
    if (result) {
      let eventData = {
        mobile: mobile
      };
      this.store().dispatch('model.account/setAccount', eventData);
    }
    wx.showToast({ title: '手机号获取成功' })
  }
  static commandName () {
    return 'SET_USER_MOBILE';
  }
}
