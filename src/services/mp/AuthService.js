import Service from '@/services/Service';
export default class AuthService extends Service {
    // 获取小程序code
    code () {
        return new Promise((resolve, reject) => {
            wx.login({
                success: ({
                              code
                          }) => {
                    return resolve(code)
                },
                fail: (res) => {
                    return reject(res)
                }
            });
        });
    }
    // 获取token
    async getToken () {
        try {
            let token = await this.service('mp.storage').get('token');
            let format = token.ttl.replace(/-/g, '/');
            let ttlTime = (new Date(format)).getTime();
            let nowTime = (new Date()).getTime();
            if (!token || ttlTime <= nowTime) {
                // 获取appId
                this.service('mp.router').push('index', {needRefresh: true});
            } else {
                return token['value'];
            }
        } catch (e) {
            this.service('mp.router').push('index', {needRefresh: true});
        }
    }
    async appSignIn() {
        try {
            let accessToken = await this.command('APP_ACCESS');
            // 请求登录接口
            let token = await this.command('SIGN_IN', accessToken);
            return token
        }catch (e) {
            throw e;
        }
    }
    checkSession () {
        return new Promise((resolve) => {
            wx.checkSession({
                success: () => {
                    return resolve(true)
                },
                fail: () => {
                    return resolve(false)
                }
            });
        });
    }
}
