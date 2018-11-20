import ApiService from './ApiService';
export default class CategoriesService extends ApiService {
  constructor ($application) {
    super($application);
  }

  async categories (page, limit = 15) {
    let response = null;

    if (this.$application.needMock()) {
      response = await this.services('mock.categories').mock(page, limit);
    } else {
      // 服务器交互代码
      console.log('<<<<<<<<<<<<<<<<<<新品预定产品列表>>>>>>>>>>>>>>>>');
      response = await this.httpGet(`/categories`, {
        page: page,
        limit: limit
      });
    }
    return [response.data, response.meta['total_pages'], limit, response.meta['total']];
  }

  async storeCategories (storeId, page, limit = 15) {
    try {
      let response = null;
      if (this.$application.needMock()) {
        response = await this.services('mock.storeCategories').mock(page, limit);
      } else {
        // 服务器交互代码
        response = await this.httpGet(`/store/${storeId}/categories`, {
          page: page,
          limit: limit
        });
      }
      return [response.data, response.meta['total_pages'], limit, response.meta['total']];
    } catch (e) {
      console.log('抛出异常', e);
      throw e;
    }
  }
}
