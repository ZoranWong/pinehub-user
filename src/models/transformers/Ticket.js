export default class Ticket {
  constructor (ticket) {
      this.id = ticket['coupon_id'];
    this.cardCode = ticket['code'];
    this.benefit = ticket['benefit'];
    this.cardId = ticket['id'];
    this.title = ticket['name'];
    this.type = ticket['type'];
    this.description = ticket['description'];
    this.remark = ticket['remark'];
    this.coupon_image = ticket['coupon_image'];
    this.discount = ticket['discount'] ? (ticket['discount'] * 1) : 1;
    this.floor = ticket['floor'] > 0 ? `满${ticket['floor']}元可用` : '无门槛';
    this.useCondition = ticket['applicable_desc'][0]['value_display'];
    this.status = ticket['state_desc'];
    this['is_sharing'] = ticket['is_sharing'] ? '可与其他优惠券共享' : '不可与其他优惠券共享';
    this.statusDesc = ticket['status_desc'];
      this.beginTimestamp = ticket['valid_at'].replace(/-/g, '.');
      this.endTimestamp = ticket['invalid_at'].replace(/-/g, '.');
    this.validTime = `${this.beginTimestamp}-${this.endTimestamp}`;
    if (this.type === 'CASH') {
        this.typeDesc = '现金券'
    } else {
        this.typeDesc = '折扣券'
    }
  }
}
