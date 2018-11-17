export default class Ticket {
  constructor (tickets) {
    this.id = tickets['id'];
    this.cardId = tickets['card_id']
    this.title = tickets['title'];
    this.type = tickets['type'];
    this.discount = tickets['discount'];
    this.leastCost = tickets['least_cost'];
    this.reduceCost = tickets['reduce_cost'];
    this.recordCount = tickets['record_count'];
    this.beginTimestamp = tickets['begin_at'];
    this.endTimestamp = tickets['end_at'];
    this.status = tickets['status'];
    console.log('ticket =====', this);
  }
}
