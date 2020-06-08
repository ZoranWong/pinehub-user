import Command from '@/commands/Command';

export default class RegisterCommand extends Command {
    // 获取token值
    async handle (e, options = {}) {
        try {
            console.log('准备注册');
            let mpUserInfoDetail = e.mp.detail;
            let userInfo = mpUserInfoDetail.userInfo;
            console.log(mpUserInfoDetail, '-------------mpUserInfoDetail--------------');
            let signature = encodeURIComponent(mpUserInfoDetail.signature);
            let rawData = mpUserInfoDetail.rawData;
            let iv = encodeURIComponent(mpUserInfoDetail.iv);
            let encryptedData = encodeURIComponent(mpUserInfoDetail.encryptedData);
            let accessToken = this.$store.getters['model.app/accessToken'];
            if (!accessToken) {
                accessToken = await this.$command('APP_ACCESS');
            }
            let sessionKey = encodeURIComponent(this.model.account.sessionKey);
            if (!iv || !encryptedData) {
                wx.showToast({
                    title: '服务器忙，请稍后重试',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }
            let result = await this.service('http.auth').mpRegister(accessToken, userInfo, signature, rawData, iv, encryptedData, sessionKey);
            let token = result['token'];
            console.log(result, '-------------result--------------');
            let refreshTtl = result['refresh_ttl'];
            let ttl = result['ttl'];
            token = {
                'value': token,
                'ttl': ttl,
                'refreshTtl': refreshTtl
            };
            await this.service('mp.storage').set('token', token);
            // userInfo = await this.service('http.auth').getUserInfo(result['token']);
            let assignedUserInfo = Object.assign(result, userInfo);
            if (result) {
                assignedUserInfo['token'] = token;
                this.model.account.dispatch('setAccount', assignedUserInfo);
                this.model.account.dispatch('setSessionKey', {
                    key: result['session_key']
                });
                return true;
            }
            return false;
        } catch (e) {
            wx.showToast({
                title: e.response.data.message,
                icon: 'none',
                duration: 1000
            });
            return false
        }
    }

    static commandName () {
        return 'USER_REGISTER';
    }
}
