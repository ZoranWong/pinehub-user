import Command from '../../../../../commands/Command';
export default class GrouponCouponIdsCommand extends Command {
    async handle (id) {
        console.log(id, '处理couponid');
        this.model.groupon.dispatch('handleIds', {
           id
       })
    }
    static commandName () {
        return 'GROUPON_ORDER_COUPON_IDS';
    }
}
