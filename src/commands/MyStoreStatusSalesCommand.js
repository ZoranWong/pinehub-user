import Command from './Command';
export default class MyStoreStatusSalesCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(selectTime) {
		console.log('CREATE-TIME', selectTime);
		let [salesInfo, sellTop, merchandiseTop, statics] = await this.service('http.myStoreStatusSales').salesInfo(selectTime);

		//echarts 处理开始
		let yData = statics;
		this.loadEcharts(selectTime, yData)
		//echarts 处理结束
		console.log('SALE-TOP', sellTop);
		this.store().dispatch({
			type: 'model.my.store.status.sales/salesInfo',
			salesInfo: salesInfo,
			sellTop: sellTop,
			merchandiseTop: merchandiseTop,
			statics: statics
		});
	}

	async loadEcharts(xDate, yData) {
		console.log('XU-ZHENG', xDate, yData, this.service('mp.eCharts'));
		let result = await this.service('mp.eCharts').createChart(xDate, yData, true);
		console.log('MySalesEchartCommand-------MySalesEchartCommand', result);
		this.store().dispatch({
			type: 'model.my.sales.echart/chartDatas',
			chartDatas: result
		});
	}

	static commandName() {
		return 'MYSTORESTATUSSALES';
	}
}