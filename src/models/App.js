import Model from './Model';

export default class App extends Model {
    data () {
        return {
            appId: null,
            logo: null,
            accessToken: null,
            contactPhoneNum: null,
            ttl: null,
            refreshTtl: null
        };
    }

    computed () {
        return {
            logo () {
                return this.state.logo;
            },
            overDate () {
                return this.state.ttl;
            },
            accessToken () {
                return this.state.accessToken;
            },
            contactPhoneNum () {
                return this.state.contactPhoneNum;
            }
        };
    }

    listeners () {
        this.addEventListener('setData', function ({appId = null, logo = null, accessToken = null, contactPhoneNum = null, ttl = null}) {
            if (appId) {
                this.state.appId = appId;
            }
            if (logo) {
                this.state.logo = logo;
            }
            if (accessToken) {
                this.state.accessToken = accessToken;
            }

            if (contactPhoneNum) {
                this.state.contactPhoneNum = contactPhoneNum;
            }

            if (ttl) {
                let format = ttl.replace(/-/g, '/');
                ttl = (new Date(format)).getTime();
                this.state.ttl = ttl;
                console.log('accessToken ttl -------', ttl, this.state.ttl);
            }
        });
    }
}
