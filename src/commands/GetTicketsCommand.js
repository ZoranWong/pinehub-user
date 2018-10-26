import Command from './Command';
export default class GetTicketsCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle (status = 'all', page = 1, limit = 15) {
    let [list, totalNum, currentPage, totalPage] = await this.service('http.tickets').list(status, page, limit);
    this.store().dispatch('model.tickets/allTickets', {
      list: list,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage,
      pageCount: limit       
    });
  }
  static commandName() {
    return 'GET_TICKETS';
  }
}
