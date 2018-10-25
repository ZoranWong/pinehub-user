import Command from './Command';
export default class GetStoreCategoriesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle (page = 1) {
    let service = this.service('http.storeCategories');
    //console.log(service,"store分类店铺顶顶顶顶")
    let [categories, totalPage, limit, totalCount] = await service.storeCategories(page);
    //console.log('storeCategories',"kkkkkkk")
    this.store().dispatch('model.storeCategories/setList', {
      list: categories,
      currentPage: page,
      totalPage: totalPage,
      totalNum: totalCount,
      pageCount: limit,
              
    });
  }
  static commandName() {
    return 'GET_STORE_CATEGORIES_TO_MEUN';
  }
}
