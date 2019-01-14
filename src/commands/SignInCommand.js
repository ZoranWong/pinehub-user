import Command from './Command';
export default class SignInCommand extends Command {
    // 获取token值
    async handle (accessToken) {
        // 获取accessToken
        try {
            let code = await this.service('mp.auth').code();

            // 请求登录接口
            let loginInfo = await this.service('http.auth').login(code, accessToken);

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
                    'ttl': ttl,
                    'refreshTtl': refreshTtl
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
                return token['value'];
            }
        } catch (e) {
            console.log(e);
        }
    }
    static commandName () {
        return 'SIGN_IN';
    }
}
