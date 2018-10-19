import ApiService from './ApiService';
export default class AccountService extends ApiService {
  constructor(app) {
    super(app);
  }
  signIn(username, password) {
    console.log(username, password);
  }
  signUp(username, password) {
    console.log(username, password);
  }
  accountInfo() {

  }
  setting() {

  }
}
