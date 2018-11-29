import ApiService from './ApiService';
export default class MyStoreInfoService extends ApiService {
  // 获取店铺信息
  async storeInfo () {
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.myStoreInfo').mock();
    } else {
      response = await this.httpGet('store/info');
    }
    let sellAmountCharts = response['order_count_statistics'];
    let buyNumCharts = response['order_payment_amount_statistics'];
    return [response, sellAmountCharts, buyNumCharts];
  }
}
