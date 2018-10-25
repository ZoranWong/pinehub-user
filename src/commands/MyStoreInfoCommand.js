import Command from './Command';
export default class MyStoreInfoCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(id) {
		let [storeInfo, sellAmountCharts, buyNumCharts] = await this.service('http.myStoreInfo').storeInfo(id);
		this.store().dispatch({
			type: 'model.my.store/storeInfo',
			storeInfo: storeInfo,
			sellAmountCharts: sellAmountCharts,
			buyNumCharts: buyNumCharts
		});
	}
	static commandName() {
		return 'MYSTOREINFO';
	}
}
