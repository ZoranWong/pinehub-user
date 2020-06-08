import ApiService from './ApiService';
import {formatTime} from '../../utils';

export default class AuthService extends ApiService {
    handling = false;

    // 获取小程序登录并验证用户是否存在
    async login (code, accessToken) {
        console.log('-----------login ing --------', this.handling);
        // if (this.handling) {
        //     return false;
        // }

        this.handling = true;
        // 服务器交互代码

        let response = await this.httpPost(`/api/mp/login`, {
            auth_code: code,
            access_token: accessToken
        }, false);
        this.handling = false;
        console.log('----- login ------', response);
        return response.data;
    }

    // 获取assess_token
    async accessToken (appId, appSecret) {
        let timestamp = new Date(); //  '2019-10-02 08:02:23'
        timestamp = formatTime(timestamp);
        let appIdAppSecret = appId + appSecret;
        console.log(appId, '--- appid ----');
        console.log(appSecret, '--- appSecret ----');
        console.log(timestamp, '--- timestamp ----');
        let appIdAppSecretMD5 = this.service('md5').encrypt(appIdAppSecret);
        let appIdAppSecretMD5Timestamp = appIdAppSecretMD5 + timestamp;
        let sign = this.service('md5').encrypt(appIdAppSecretMD5Timestamp);
        let response = await this.httpGet(`/api/mp/access_token`, {
            project_id: appId,
            sign: sign,
            timestamp: timestamp
        }, false);
      console.log(response.data, '===============================token===============================');
      return response.data;
    }

    // 提交用户信息并保存
    async mpRegister (accessToken, userInfo, signature, rawData, iv, encryptedData, sessionKey) {
        console.log('------ register ------');
        let response = await this.httpPost(`/api/mp/register`, {
            access_token: accessToken,
            // user_info: userInfo,
            // raw_data: rawData,
            // signature: signature,
            encrypted_data: encryptedData,
            iv: iv,
            session_key: sessionKey
        }, false);
        console.log(response, 'register response');
        return response.data
    }

    // 提交手机号
    async setMobile (encryptedData, iv, token, sessionKey) {
        let response = await this.httpPut(`/api/mp/bind/mobile`, {
            encrypted_data: encryptedData,
            iv: iv,
            token,
            session_key: sessionKey
        });
        return response.data;
    }

    // 获取用户信息
    async getUserInfo (token = null) {
        let response = null;
        if (this.handling) {
            return false;
        }
        this.handling = true;
        if (this.$application.needMock()) {
            response = await this.service('mock.myInfo').mock();
        } else {
            if (token) {
                response = await this.httpGet(`/api/mp/self/info`, {access_token: token});
            } else {
                response = await this.httpGet(`/api/mp/self/info`, {});
            }
        }
        this.handling = false;
        return response.data;
    }

    // 用户余额变动明细
    async balanceRecord () {
        let response = await this.httpGet('api/mp/user/balance/logs', {page: 1, limit: 100000});
        return response.data;
    }
}
