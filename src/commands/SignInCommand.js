import Command from './Command';
export default class SignInCommand extends Command {
    // 获取token值
    async handle () {
        // 获取appId
        let appId = this.$application.config['app']['appId'];
        // 获取appSecret
        let appSecret = this.$application.config['app']['appSecret'];
        // 获取accessToken
        try {
            let data = await this.service('http.auth').accessToken(appId, appSecret);
            let accessToken = data['access_token'];
            let logo = data['logo'];
            let contactPhoneNum = data['contact_phone_num'];
            this.$store.dispatch('model.app/setData', {
                accessToken: accessToken,
                appId: appId,
                logo: logo,
                contactPhoneNum: contactPhoneNum
            });

            let code = await this.service('mp.auth').code();

            // 请求登录接口
            let loginInfo = await this.service('http.auth').login(code, accessToken);
            console.log('loginInfo', loginInfo)
            if (!loginInfo.token) {
                console.log('到这里来就不登录了')
            } else {
                let token = loginInfo.token;
                let openId = loginInfo.open_id;
                let mobile = loginInfo.mobile;
                let canUseScore = loginInfo.can_use_score;
                let refreshTtl = loginInfo.refresh_ttl;
                let ttl = loginInfo.ttl;
                if (loginInfo.shop_id) {
                    let shopId = loginInfo.shop_id;
                    await this.service('mp.storage').set('shopId', shopId);
                }

                token = {
                    'value': token,
                    'ttl': ttl.date,
                    'refreshTtl': refreshTtl.date
                };
                await this.service('mp.storage').set('token', token);
                await this.service('mp.storage').set('openId', openId);
                let userInfo = {
                    open_id: openId,
                    mobile: mobile,
                    can_use_score: canUseScore,
                    token: token
                };
                this.$store.dispatch('model.account/setAccount', userInfo);
            }
        } catch (e) {
            console.log(e);
        }
    }
    static commandName () {
        return 'SIGN_IN';
    }
}
