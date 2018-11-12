import Command from './Command';
export default class MySalesEchartCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(xDate) {
		let yData = null;
		let [salesInfo, sellTop, merchandiseTop, statics] = await this.service('http.myStoreStatusSales').salesInfo(
			xDate);
		yData = statics;
		console.log('XU-ZHENG', xDate, yData, this.service('mp.eCharts'));
		let result = await this.service('mp.eCharts').createChart(xDate, yData, true);
		console.log('MySalesEchartCommand-------MySalesEchartCommand', result);
		this.store().dispatch({
			type: 'model.my.sales.echart/chartDatas',
			chartDatas: result
		});
	}
	static commandName() {
		return 'MYSALESECHARTS';
	}
}
