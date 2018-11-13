import Command from './Command';
export default class MyStoreInfoCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(id) {
		let shopId = await this.service('mp.storage').get('shopId');
		let [storeInfo, sellAmountCharts, buyNumCharts] = await this.service('http.myStoreInfo').storeInfo(shopId);
		let eventData = {
			storeInfo: storeInfo,
			sellAmountCharts: sellAmountCharts,
			buyNumCharts: buyNumCharts
		};
		this.store().dispatch('model.my.store/storeInfo', eventData);
	}
	static commandName() {
		return 'MYSTOREINFO';
	}
}