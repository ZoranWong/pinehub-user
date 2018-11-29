import Command from './Command';
export default class MySalesEchartCommand extends Command {
  async handle (xDate) {
    let [salesInfo, consumptionRanking, merchandiseSalesRanking, orderStatistics] = await this.service('http.myStoreStatusSales').salesInfo(xDate);
    let yData = orderStatistics;
    let result = await this.service('mp.eCharts').createChart(xDate, yData, true);
    this.store().dispatch({
      type: 'model.my.sales.echart/chartDatas',
      chartDatas: result
    });
  }
  static commandName () {
    return 'MYSALESECHARTS';
  }
}
