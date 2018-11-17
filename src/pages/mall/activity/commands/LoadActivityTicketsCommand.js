import Command from '@/commands/Command';
export default class LoadActivityTicketsCommand extends Command {
  async handle (activityId, totalAmount = null, page = 1, status = 'available') {
    try {
      let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').activityTickets(status, activityId, page);
      this.store().dispatch('model.activity.tickets/setList', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
      console.log('load activity tickets ==========', e);
    }
  }

  static commandName () {
    return 'LOAD_ACTIVITY_TICKETS';
  }
}
