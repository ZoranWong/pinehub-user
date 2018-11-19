import Command from './Command';
export default class MyStoreInfoCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(shopId) {
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
	}
	static commandName() {
		return 'MYSTOREINFO';
	}
}