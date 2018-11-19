import Command from '@/commands/Command';
export default class LoadStoreTicketsCommand extends Command {
  async handle (page = 1, status = 'available') {
    try {
      let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').storeTickets(status, page);
      this.store().dispatch('model.store.tickets/setList', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
      console.log('load tickets ==========', e);
    }
  }

  static commandName () {
    return 'LOAD_STORE_TICKETS';
  }
}
