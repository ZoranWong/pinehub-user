import ApiService from '@/services/http/ApiService';

export default class CategoriesService extends ApiService {
    async categories (page, limit = 15) {
        let response = await this.httpGet(`/categories`, {
            page: page,
            limit: limit
        });
        return [response.data, response.meta['total_pages'], limit, response.meta['total']];
    }

    async storeCategories (storeId, page, limit = 15) {
        try {
            let response = await this.httpGet(`/store/${storeId}/categories`, {
                page: page,
                limit: limit
            });
            let pagination = response.meta.pagination;
            let totalNum = pagination.total;
            let currentPage = pagination['current_page'];
            let totalPage = pagination['total_pages'];
            return [response.data, totalNum, currentPage, totalPage, limit];
        } catch (e) {
            console.log('抛出异常', e);
            throw e;
        }
    }
}
