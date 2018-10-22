import Command from './Command';
export default class GetCategoriesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle (page = 1) {

    let service = this.service('http.categories');
    let [categories, totalPage, limit, totalCount] = await service.categories(page);
    console.log('get categories list ', categories);
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
