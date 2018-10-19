import Command from './Command';
export default class GetMerchandisesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle () {
    let args = Array.prototype.slice.apply(arguments);
    let event = args.shift();
    let serviceMethod = args.shift();
    let service = this.service('http.merchandises');
    // console.log(args, event)
  	let [ merchandises, totalNum, currentPage, totalPage, limit] = await service[serviceMethod].apply(service, args);
  	// console.log(event, merchandises, totalNum, currentPage, totalPage);
    this.store().dispatch(event, {
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
