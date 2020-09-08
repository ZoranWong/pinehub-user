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
    // 获取我的消费卡列表
    async consumerCards () {
        let response = await this.httpGet(`/api/mp/consume_cards/mine`);
        return response;
    }
    async exchangeRecords () {
        let response = await this.httpGet(`/api/mp/consume_cards/exchange_records`);
        return response;
    }
    async cardDetails (id) {
        let response = await this.httpGet(`/api/mp/consume_cards/mine/${id}/amount_change_logs`);
        return response;
    }
   
    async cardActives (recordId) {
        let response = await this.httpGet(`/api/mp/consume_cards/${recordId}/activate`);
        return response;
    }
    // 获取未激活消费卡
    async noActiveCard () {
        let response = await this.httpGet(`/api/mp/consume_cards/pop`);
        return response;
    }
    // 获取已激活的消费卡
    async getActivationCard () {
        console.log("获取已激活的消费卡")
        let response = await this.httpGet(`/api/mp/consume_cards/mine/active`);
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
	// 优惠券弹框
    async popup (mode) {
        let response = await this.httpGet(`/api/mp/coupons/popup/all?release_mode=${mode}`);
        console.log(response, '===================>');
        return response.data;
    }
}
