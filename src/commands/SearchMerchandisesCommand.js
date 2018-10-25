
import Command from './Command';
export default class SearchMerchandisesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(name,page = 1,limit = 20) {
  	console.log('搜索--commandjs')
     // 与服务器打交道，获取数据，返回数据
     let [ list, totalNum, totalPage, currentPage] = await this.service('http.merchandises').searchMerchandise(name, page);

     this.store().dispatch('model.search/setList', {
      list: search,
      totalPage: totalPage,
      pageCount: limit,
      totalNum: totalCount,           
    });


  }
  static commandName() {
    return 'SEARCH_MERCHANDISES';
  }
}
