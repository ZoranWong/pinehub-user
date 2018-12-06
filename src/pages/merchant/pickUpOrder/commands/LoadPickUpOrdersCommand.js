import Command from '@/commands/Command';
export default class LoadPickUpOrdersCommand extends Command {
  async handle (date, page = 1, limit = 15) {
    let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').pickedUpOrders(date, page, limit);
    this.store().dispatch({
      type: 'model.pickUp.orders/setList',
      list: list,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage,
      pageCount: limit,
      status: 'all'
    });
  }
  static commandName () {
    return 'LOAD_PICK_UP_ORDERS';
  }
}
