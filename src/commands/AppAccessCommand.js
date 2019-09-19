import Command from './Command';
export default class AppAccessCommand extends Command {
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
            // this.$store.dispatch('model.app/setData', {
            //     accessToken: accessToken,
            //     appId: appId,
            //     logo: logo,
            //     contactPhoneNum: contactPhoneNum,
            //     ttl: data['ttl']
            // });
            this.model.app.dispatch('setData', {
                accessToken: accessToken,
                appId: appId,
                logo: logo,
                contactPhoneNum: contactPhoneNum,
                ttl: data['ttl']
            });

            return accessToken;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'APP_ACCESS';
    }
}
