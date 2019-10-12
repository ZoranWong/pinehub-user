import ApiService from './ApiService';

export default class ChargeCardService extends ApiService {
    
    async rechargeCards () {
        let response = await this.httpGet('api/mp/deposit/cards', {
            page: 1,
            limit: 100
        });
        return response.data
    }
    
    async createRechargeOrder (cardId) {
        let response = await this.httpPost(`api/mp/deposit/cards/${cardId}/order`);
        return response.data
    }
}
