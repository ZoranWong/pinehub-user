import Command from './Command';
export default class GetStoreCategoriesCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(page = 1) {
		try {
			let [categories, totalPage, limit, totalCount] = await this.service('http.categories').storeCategories(page);
			this.store().dispatch('model.storeCategories/setList', {
				list: categories,
				currentPage: page,
				totalPage: totalPage,
				totalNum: totalCount,
				pageCount: limit,

			});
		} catch(e) {
			console.log(e)
		}
	}
	static commandName() {
		return 'GET_STORE_CATEGORIES_TO_MEUN';
	}
}