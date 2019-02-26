import Model from './Model';
export default class App extends Model {
  data() {
    return {
      appId: null,
      logo: null,
      accessToken: null,
      contactPhoneNum: null,
      ttl: null,
      refreshTtl: null
    };
  }

  computed() {
    return {
      logo() {
        return this.state.logo;
      },
      accessToken() {
        if (this.state.ttl) {
          let format = this.state.ttl.replace(/-/g, '/');
          let ttlDate = new Date(format);
          let nowDate = new Date();
          if (ttlDate.getTime() - 5000 > nowDate.getTime()) {
            return this.state.accessToken;
          }
        }
        return false;
      },
      contactPhoneNum() {
        return this.state.contactPhoneNum;
      }
    };
  }

  listeners() {
    this.addEventListener('setData', function({ appId = null, logo = null, accessToken = null, contactPhoneNum = null, ttl = null }) {
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
        this.state.ttl = ttl;
      }
    });
  }
}
