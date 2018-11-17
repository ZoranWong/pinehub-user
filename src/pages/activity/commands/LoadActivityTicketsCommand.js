import Command from '@/commands/Command';
export default class LoadActivityTicketsCommand extends Command {
  async handle (activityId, page = 1, status = 0) {
    try {
      let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').activityTickets(status, activityId, page);
      this.store().dispatch('model.tickets/allTickets', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
      console.log(e);
    }
  }

  static commandName () {
    return 'LOAD_ACTIVITY_TICKETS';
  }
}
