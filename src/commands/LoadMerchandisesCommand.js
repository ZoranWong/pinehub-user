import Command from './Command';
export default class LoadMerchandisesCommand extends Command {
  // 获取到新品预定列表
  async handle () {
    try {
      let args = Array.prototype.slice.apply(arguments);
      let event = args.shift();
      let serviceMethod = args.shift();
      let service = this.service('http.merchandises');
      let [merchandises, totalNum, currentPage, totalPage, limit] = await service[serviceMethod].apply(service, args);
      this.store().dispatch(event, {
        list: merchandises,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
      return false;
    }
  }
  static commandName () {
    return 'LOAD_MERCHANDISE_LIST';
  }
}
