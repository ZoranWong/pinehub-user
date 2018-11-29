import ApiService from './ApiService';
export default class MyStoreModifyStockService extends ApiService {
  // 获取店铺产品分类列表
  async storeCategories (storeId, page = 1, limit = 15) {
    let response = null;
    console.log('MyStoreCategoriesService--------MyStoreCategoriesService');
    if (this.$application.needMock()) {
      console.log('AAAAAAAAAAAA');
      response = await this.services('mock.myStoreCategories').mock(storeId, page, limit);
    } else {
      // 服务器交互代码
      response = await this.httpGet(`store/${storeId}/categories`, {
        store_id: storeId,
        page: page
      });
    }
    let categories = response.data;
    let pagination = response.meta.pagination;
    console.log('pagination------pagination', pagination);
    let totalNum = pagination.total;
    let currentPage = pagination['current_page'];
    let totalPage = pagination['total_pages'];
    return [categories, totalNum, currentPage, totalPage];
  }
  // 提交反馈数据
  async modifyStock (id, primaryStockNum, modifyStockNum, reason, comment) {
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.myStoreModifyStock').mock(id, primaryStockNum, modifyStockNum, reason, comment);
    } else {
      console.log('修改库存', id, primaryStockNum, modifyStockNum, reason, comment);
      // 服务器交互代码部分
      response = await this.httpPut(`/store/merchandise/${id}/stock`, {
        primary_stock_num: primaryStockNum,
        modify_stock_num: modifyStockNum,
        reason: reason,
        comment: comment
      });
    }
    return [response.data];
  }
}
