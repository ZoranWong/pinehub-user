import Command from '@/commands/Command';
export default class LoadUserTicketsCommand extends Command {
  async handle (page = 1, status = 'available') {
    try {
      let [list, totalNum, currentPage, totalPage] = await this.service('http.tickets').userTickets(status, page, 15);
      this.store().dispatch('model.user.tickets/setList', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: 15
      });
    } catch (e) {
        throw e;
    }
  }

  static commandName () {
    return 'LOAD_USER_TICKETS';
  }
}
