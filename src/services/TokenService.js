import Service from './Service';
export default class TokenService extends Service {
  constructor($application) {
    super($application);
    this.token = null;
  }
  // eslint-disable-next-line
  async getToken(self = this) {
    let token = await self.asyncToken();
    return  token;
  }

  asyncToken() {
    let token = this.services('session').get('token');
    console.log(token);
    return new Promise(function(resolve) {
      return resolve(token);
    }).then(function (token) {
      return  token;
    });
  }

  getRefreshToken() {

  }
  refresh() {

  }
  setToken() {

  }
}
