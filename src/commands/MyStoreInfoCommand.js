import Command from './Command';
export default class MyStoreInfoCommand extends Command {
  async handle (shopId) {
    try {
      let [storeInfo, sellAmountCharts, buyNumCharts] = await this.service('http.myStoreInfo').storeInfo(shopId);
      let xDate = 'week';
      let sellAmountECharts = await this.service('mp.eCharts').createChart(xDate, sellAmountCharts, true);
      let buyNumECharts = await this.service('mp.eCharts').createChart(xDate, buyNumCharts, true);
      let eventData = {
        storeInfo: storeInfo,
        sellAmountECharts: sellAmountECharts,
        buyNumECharts: buyNumECharts
      };
      console.log('数据', sellAmountECharts, buyNumECharts)
      this.store().dispatch('model.my.store/storeInfo', eventData);
    } catch (e) {
      console.log(e);
    }
  }
  static commandName () {
    return 'MY_STORE_INFO';
  }
}
