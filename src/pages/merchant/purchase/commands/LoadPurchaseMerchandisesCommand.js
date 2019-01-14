import Command from '@/commands/Command';
export default class LoadPurchaseMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
  }
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
      console.log('抛出错误', e);
      return false;
    }
  }
  static commandName () {
    return 'LOAD_PURCHASE_MERCHANDISES';
  }
}
