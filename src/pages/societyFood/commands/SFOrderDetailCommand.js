import Command from '@/commands/Command';
export default class SFOrderDetailCommand extends Command {
    async handle (orderId,that) {
        try {
            let result = await this.service('http.societyFood').getOrderDetail(orderId);
            console.log("社会餐获取订单详情"+JSON.stringify(result));
            that.orderDetail=result.data;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_ORDER_DETAIL';
    }
}
