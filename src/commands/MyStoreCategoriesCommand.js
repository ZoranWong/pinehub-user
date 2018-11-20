import Command from './Command';
export default class MyStoreCategoriesCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(page = 1, limit = 15) {
		console.log('MyStoreCategoriesCommand-------MyStoreCategoriesCommand');
		let storeId = await this.service('mp.storage').get('shopId');
		let [list, totalNum, currentPage, totalPage] = await this.service('http.myStoreCategories').list(storeId, page,
			limit);
		console.log('[list, totalNum, currentPage, totalPage]', [list, totalNum, currentPage, totalPage]);
		this.store().dispatch({
			type: 'model.my.store.categories/setList',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
		console.log('---------------------------------');
	}
	static commandName() {
		return 'MYSTORECATEGORIES';
	}
}