import ApiService from './ApiService';
export default class MyStoreStatusSalesService extends ApiService {
  // 获取进货统计
  async salesInfo (selectTime) {
    console.log('进货统计调用', selectTime);
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.myStoreStatusSales').mock(selectTime);
    } else {
      response = await this.httpGet('store/sell/statistics', {
        'date': selectTime
      });
    }
    console.log('sell_top       数据', response)
    let [salesInfo, sellTop, merchandiseTop, statics] = [response, response.sell_top, response.merchandise_top, response.statics];
    console.log('获取店铺信息------------真他吗烦人', salesInfo, sellTop, merchandiseTop, statics);
    return [salesInfo, sellTop, merchandiseTop, statics];
  }
}
