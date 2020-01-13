import ApiService from './ApiService';

export default class AddressService extends ApiService {
    async addresses () {
        let response = await this.httpGet('/api/mp/user/shipping_addresses/all');
        return response;
    }

    async createAddress (params) {
        let response = await this.httpPost('/api/mp/user/shipping_addresses', params);
        return response;
    }
}
