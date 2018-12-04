import Command from '@/commands/Command';
export default class SetUserMobileCommand extends Command {
    async handle (e) {
        let detial = e.mp.detail;
        let iv = encodeURIComponent(detial.iv);
        let encryptedData = encodeURIComponent(detial.encryptedData);
        let result = await this.service('http.auth').setMobile(encryptedData, iv);
        let mobile = result.mobile;
        if (result) {
            let eventData = {
                mobile: mobile
            };
            this.store().dispatch('model.account/setAccount', eventData);
        }
        wx.showToast({
            title: '手机号获取成功'
        })
    }
    static commandName () {
        return 'SET_USER_MOBILE';
    }
}
