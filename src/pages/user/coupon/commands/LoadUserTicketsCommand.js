import Command from '@/commands/Command';
export default class LoadUserTicketsCommand extends Command {
  async handle (page = 1, status = 'available') {
    try {
      let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').userTickets(status, page);
      this.store().dispatch('model.user.tickets/setList', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
      console.log('load user tickets ==========', e);
    }
  }

  static commandName () {
    return 'LOAD_USER_TICKETS';
  }
}
