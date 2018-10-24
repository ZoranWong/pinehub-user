import Command from './Command';
export default class MyStoreStatusPurchaseCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(selectTime) {
	    let [purchaseList,purchaseTotal] = await this.service('http.myStoreStatusPurchase').purchaseInfo(selectTime);
		console.log('pur------pur',[purchaseList,purchaseTotal]);
		this.store().dispatch({
			type: 'model.my.store.status.purchase/purchaseInfo',
			purchaseList: purchaseList,
			purchaseTotal: purchaseTotal
		});
	}
	static commandName() {
		return 'MYSTORESTATUSPURCHASE';
	}
}