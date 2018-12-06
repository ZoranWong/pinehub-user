import Command from '@/commands/Command';
export default class LoadStoreCategoriesCommand extends Command {
  constructor (app) {
    super(app);
  }

  async handle (storeId, page = 1) {
    try {
      let [categories, totalPage, limit, totalCount] = await this.service('http.categories').storeCategories(storeId, page);
      this.$store.dispatch('model.storeMarket.categories/setList', {
        list: categories,
        currentPage: page,
        totalPage: totalPage,
        totalNum: totalCount,
        pageCount: limit
      });
    } catch (e) {
      console.log(e)
    }
  }
  static commandName () {
    return 'LOAD_STORE_CATEGORIES';
  }
}
