import Service from '@/services/Service';

export default class AuthService extends Service {
    except = ['index', 'payment']
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
            let route = this.service('mp.router').currentRouter;
            if (!token || ((ttlTime - 5000 <= nowTime) && (this.except.indexOf(route) === -1))) {
                // 获取appId
                console.log('------------ 000000 -----------');
                // this.service('mp.router').push('index', {query: {needRefresh: true}});
            } else {
                return token['value'];
            }
        } catch (e) {
            // this.service('mp.router').push('index', {query: {needRefresh: true}});
        }
    }

    async appSignIn () {
        try {
            let accessToken = await this.command('APP_ACCESS');
            // 请求登录接口
            let token = await this.command('SIGN_IN', accessToken);
            return token
        } catch (e) {
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
