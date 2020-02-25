import Command from '@/commands/Command';
export default class SetUserMobileCommand extends Command {
     handle (e) {
        let detial = e.mp.detail;
        let self = this;
        wx.checkSession({
            async success () {
                console.log('success');
                // session_key 未过期，并且在本生命周期一直有效
                if (detial.errMsg !== 'getPhoneNumber:ok') {
                    wx.showToast({
                        title: '请允许手机号授权',
                        icon: 'none'
                    });
                    return
                }
                let token = self.model.account.token.value;
                let iv = encodeURIComponent(detial.iv);
                let encryptedData = encodeURIComponent(detial.encryptedData);
                // 加判断
                let sessionKey = encodeURIComponent(self.model.account.sessionKey);
                if (!iv || !encryptedData) {
                    wx.showToast({
                        title: '手机号获取失败,请重新授权',
                        icon: 'none'
                    });
                    return
                }

                let result = await self.service('http.auth').setMobile(encryptedData, iv, token, sessionKey);
                let mobile = result.mobile;
                if (result) {
                    let eventData = {
                        mobile: mobile
                    };
                    self.store().dispatch('model.account/setAccount', eventData);
                    self.$command('LOAD_POP', 'NEW_USER')
                } else {
                    wx.showToast({
                        title: '手机号获取失败,请稍后再试',
                        icon: 'none'
                    })
                }
                console.log('----------------------------engine start------------------------------');
                wx.showToast({
                    title: '手机号获取成功'
                })
            },
            fail () {
                // session_key 已经失效，需要重新执行登录流程
                wx.login() // 重新登录
            }
        });
    }
    static commandName () {
        return 'SET_USER_MOBILE';
    }
}
