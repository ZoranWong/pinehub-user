import Command from '@/commands/Command';
export default class SelfextraOrderCommand extends Command {
  async handle (stratTime, endTime, page = 1, limit = 15) {
    let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').pickedUpOrders(stratTime, endTime, page);
    this.store().dispatch({
      type: 'model.extra.orders/setList',
      list: list,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage,
      pageCount: limit,
      status: 'all'
    });
  }
  static commandName () {
    return 'selfextra-orders';
  }
}
