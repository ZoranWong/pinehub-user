import ApiService from './ApiService';

export default class NewIndexService extends ApiService {
    // 首页banner
    async getIndexBanner (params) {
        console.log(params, '+++++++++++++++++++++++++++++++++++');
        let response = await this.httpGet(`/api/mp/banners/all?searchJson=${params.searchJson}`);
        return response.data
    }
}
