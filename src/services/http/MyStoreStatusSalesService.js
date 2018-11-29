import ApiService from './ApiService';
export default class MyStoreStatusSalesService extends ApiService {
  // 获取进货统计
  async salesInfo (selectTime) {
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.myStoreStatusSales').mock(selectTime);
    } else {
      response = await this.httpGet('store/sales/statistics', { 'date': selectTime });
    }
    let [salesInfo, consumptionRanking, merchandiseSalesRanking, orderStatistics] = [response, response['consumption_ranking'], response['merchandise_sales_ranking'], response['order_statistics']];
    return [salesInfo, consumptionRanking, merchandiseSalesRanking, orderStatistics];
  }
}
