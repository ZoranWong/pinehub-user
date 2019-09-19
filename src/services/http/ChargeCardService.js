import ApiService from './ApiService';

export default class ChargeCardService extends ApiService {
    async rechargeableCards (amount) {
        let response = await this.httpGet(`//rechargeable_cards`, {
            amount: amount
        });
        return [response.data, response.meta['balance']];
    }
}
