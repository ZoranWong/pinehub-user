import Model from './Model';
export default class App extends Model {
    data () {
        return {
            appId: null,
            logo: null,
            accessToken: null,
            contactPhoneNum: null
        };
    }

    computed () {
        return {
            logo () {
                return this.state.logo;
            },
            accessToken () {
                return this.state.logo;
            },
            contactPhoneNum () {
                return this.state.contactPhoneNum;
            }
        };
    }

    listeners () {
        this.addEventListener('setData', function ({appId = null, logo = null, accessToken = null, contactPhoneNum = null}) {
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
        });
    }
}
