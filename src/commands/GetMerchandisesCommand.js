import Command from './Command';
export default class GetMerchandisesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(activityid, page = 1, search = null, limit = 10) {
   	console.log(activityid, page);
	let [ merchandises, totalNum, currentPage, totalPage ] = await this.service('http.merchandises').list(activityid, page, search, limit);
	console.log(merchandises);
	this.store().dispatch('model.merchandises/setList', {
		list: merchandises,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
	});
  }
  static commandName() {
    return 'GET_MERCHANDISE_LIST';
  }
}
