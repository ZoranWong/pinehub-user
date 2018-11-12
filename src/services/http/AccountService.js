import ApiService from './ApiService';
export default class AccountService extends ApiService {
  constructor(app) {
    super(app);
  }
  async signIn(username, password) {
    // console.log(username, password);
    let response = await this.httpPost('/login', {user_name: username, password: password});
    return response.data;
  }
  signUp(username, password) {
    console.log(username, password);
  }
  accountInfo() {

  }
  setting() {

  }
}
