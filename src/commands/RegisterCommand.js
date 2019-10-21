import Command from '@/commands/Command';

export default class RegisterCommand extends Command {
    // 获取token值
    async handle (e) {
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
        console.log('------------- register auth ---------', accessToken);
        let result = await this.service('http.auth').mpRegister(accessToken, userInfo, signature, rawData, iv, encryptedData);
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
        let assignedUserInfo = Object.assign(result, userInfo)
        if (result) {
            assignedUserInfo['token'] = token;
            this.model.account.dispatch('setAccount', assignedUserInfo);
            return true;
        }
        return false;
    }

    static commandName () {
        return 'USER_REGISTER';
    }
}
