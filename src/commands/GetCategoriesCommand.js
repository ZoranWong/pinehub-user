import Command from './Command';
export default class GetCategoriesCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(page = 1) {
		try {
			let service = this.service('http.categories');
			let [categories, totalPage, limit, totalCount] = await service.categories(page);
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}
		this.store().dispatch('model.categories/setList', {
			list: categories,
			currentPage: page,
			totalPage: totalPage,
			totalNum: totalCount,
			pageCount: limit,

		});
	}
	static commandName() {
		return 'GET_CATEGORIES_TO_MEUN';
	}
}