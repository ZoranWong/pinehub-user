import Command from '@/commands/Command';
export default class MyOrderCommand extends Command {
  async handle(status, page = 1, limit = 5) {
    if (page > 1) {
      let currentPage = this.store().getters['model.user.orders/currentPage'];
      let totalNum = this.store().getters['model.user.orders/totalNum']
      console.log('NEXT_PAGE', currentPage, totalNum);
    }
    // console.log('---- order ----', status, page);
    // console.log('----- start -----', Date.now());
    let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').userOrders(status, page, limit);
    // console.log('----- request -----', Date.now());
    this.store().dispatch({
      type: 'model.user.orders/setList',
      list: list,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage,
      pageCount: limit,
      status: status
    });
    // console.log('----- set data -----', Date.now());
  }
  static commandName() {
    return 'LOAD_USER_ORDERS';
  }
}
