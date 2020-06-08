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

    async editAddress (params, userShippingAddress) {
        let response = await this.httpPut(`/api/mp/user/shipping_addresses/${userShippingAddress}`, params);
        return response;
    }

    async deleteAddress (userShippingAddress) {
        let response = await this.httpDelete(`/api/mp/user/shipping_addresses/${userShippingAddress}`);
        return response;
    }
}
