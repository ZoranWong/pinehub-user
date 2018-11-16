import Command from './Command';
export default class MyStoreStatusPurchaseCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(selectTime, limit = 15) {
		console.log('PER');
		try {
			let [list, totalNum, currentPage, totalPage] = await this.service('http.myStoreStatusPurchase').purchaseInfo(selectTime);
			let eventData = {
				list: list,
				totalNum: totalNum,
				currentPage: currentPage,
				totalPage: totalPage,
				pageCount: limit
			};
			this.$store.dispatch('model.my.store.status.purchase/purchaseInfo', eventData);
		} catch(e) {
			console.log(e);
			return false;
		}

	}
	static commandName() {
		return 'MYSTORESTATUSPURCHASE';
	}
}