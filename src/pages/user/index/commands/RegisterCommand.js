import Command from '@/commands/Command';
export default class RegisterCommand extends Command {
    // 获取token值
    async handle (e) {
        let mpUserInfoDetail = e.mp.detail;
        let userInfo = mpUserInfoDetail.userInfo;
        let signature = encodeURIComponent(mpUserInfoDetail.signature);
        let rawData = mpUserInfoDetail.rawData;
        let iv = encodeURIComponent(mpUserInfoDetail.iv);
        let encryptedData = encodeURIComponent(mpUserInfoDetail.encryptedData);
        let accessToken = this.$store.getters['model.app/accessToken'];
        let result = await this.service('http.auth').mpRegister(accessToken, userInfo, signature, rawData, iv, encryptedData);
        let token = result['token'];
        let refreshTtl = result['refresh_ttl'];
        let ttl = result['ttl'];
        token = {
            'value': token,
            'ttl': ttl.date,
            'refreshTtl': refreshTtl.date
        };
        await this.service('mp.storage').set('token', token);
        userInfo = await this.service('http.auth').getUserInfo(token);
        if (result) {
            userInfo['token'] = token;
            this.store().dispatch('model.account/setAccount', userInfo);
        }
    }
    static commandName () {
        return 'USER_REGISTER';
    }
}
