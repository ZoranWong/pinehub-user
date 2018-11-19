import ApiService from './ApiService';
export default class NearbyStoresService extends ApiService {
  // 获取订单列表
  async list (lng, lat, page = 1, limit = 100) {
    console.log('进去list里了-------------', lng, lat);
    let listData = null;
    let totalNum = null;
    let totalPage = null;
    let currentPage = null;
    let pageCount = null;
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.nearbyStores').mock(lng, lat, page, limit);
    } else {
      // 服务器交互代码
      response = await this.httpGet('/nearby/stores', {
        lng: lng,
        lat: lat,
        limit: limit,
        page: page
      });
    }
    console.log('附近店铺查询结果', response);
    listData = response.data;
    let pagination = response.meta.pagination;
    totalNum = pagination.total;
    currentPage = pagination['current_page'];
    totalPage = pagination['total_pages'];
    pageCount = pagination['per_page'];
    return [listData, totalNum, currentPage, totalPage, pageCount];
  }
}
