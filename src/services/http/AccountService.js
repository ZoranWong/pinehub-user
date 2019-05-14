import ApiService from './ApiService';

export default class AccountService extends ApiService {
    async signIn (username, password) {
        // console.log(username, password);
        let response = await this.httpPost('/login', {user_name: username, password: password});
        return response;
    }

    async saveFormId (id) {
        console.log('==================', id);
        let response = await this.httpPost(`/formid/${id}`);
        console.log('==================', response);
        return response.data;
    }

    signUp (username, password) {
        console.log(username, password);
    }

    accountInfo () {
    }

    setting () {
    }
}
