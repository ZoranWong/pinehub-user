import ApiService from './ApiService';
import {Base64} from '../../utils/beSecret';

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
    async exchange (code) {
        let response = await this.httpPost(`/api/mp/consume_cards/exchange`, {
            exchange_code: code
        });
        return response;
    }


    async orderRecords (page, limit) {
        console.log(`---------------------- order records ----------------`);
        let response = await this.httpGet(`/customer/rechargeable_cards/consume/records`, {
            page: page,
            limit: limit
        });
        return [response.data, response.meta['total_pages'], limit, response.meta['total']];
    }

    async superior (code, reset) {
        let api = reset ? `api/mp/user/superior/shop/${Base64.encode(code)}/reset` : `api/mp/user/superior/shop/${Base64.encode(code)}`;
        let response = await this.httpPut(api);
        return response.data;
    }

    async popup (mode) {
        let response = await this.httpGet(`/api/mp/coupons/popup/all?release_mode=${mode}`);
        console.log(response, '===================>');
        return response.data;
    }
}
