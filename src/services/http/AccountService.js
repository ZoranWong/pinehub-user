import ApiService from './ApiService';

export default class AccountService extends ApiService {
    async signIn (username, password) {
        // console.log(username, password);
        let response = await this.httpPost('/login', {user_name: username, password: password});
        return response;
    }

    async saveFormId (id) {
        let response = await this.httpPost('/api/mp/formid/collect', {
            form_id: id
        });
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

    async balance () {
        let response = await this.httpGet(`/user/balance`);
        return response.data;
    }

    async orderRecords (page, limit) {
        console.log(`---------------------- order records ----------------`);
        let response = await this.httpGet(`/customer/rechargeable_cards/consume/records`, {
            page: page,
            limit: limit
        });
        return [response.data, response.meta['total_pages'], limit, response.meta['total']];
    }
}
