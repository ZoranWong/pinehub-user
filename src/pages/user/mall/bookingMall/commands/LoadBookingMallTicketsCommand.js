import Command from '@/commands/Command';
export default class LoadBookingMallTicketsCommand extends Command {
  async handle (page = 1, status = 'available') {
    try {
      let [list, totalNum, currentPage, totalPage, limit] = await this.service('http.tickets').bookingMallTickets(status, page);
      this.store().dispatch('model.bookingMall.tickets/setList', {
        list: list,
        totalNum: totalNum,
        currentPage: currentPage,
        totalPage: totalPage,
        pageCount: limit
      });
    } catch (e) {
        return false;
    }
  }

  static commandName () {
    return 'LOAD_BOOKING_MALL_TICKETS';
  }
}
