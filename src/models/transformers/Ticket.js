export default class Ticket {
  constructor (ticket) {
    this.id = ticket['id'];
    this.cardCode = ticket['code'];
    this.benefit = ticket['benefit'];
    this.cardId = ticket['id'];
    this.title = ticket['name'];
    this.type = ticket['type'];
    this.discount = ticket['discount'] ? (ticket['discount'] * 1) : 1;
    this.leastCost = ticket['least_cost'];
    this.reduceCost = ticket['reduce_cost'];
    this.recordCount = ticket['record_count'];
    this.beginTimestamp = ticket['valid_at'].replace(/-/g, '.');
    this.endTimestamp = ticket['invalid_at'].replace(/-/g, '.');
    this.status = ticket['state'];
    this.statusDesc = ticket['status_desc'];
    this.validTime = `${this.beginTimestamp}-${this.endTimestamp}`;
    if (this.type === 'CASH') {
        this.typeDesc = '现金券'
    } else {
        this.typeDesc = '满减券'
    }
  }
}
