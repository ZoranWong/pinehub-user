import Command from '@/commands/Command';
export default class SFOrderDetailCommand extends Command {
    async handle (orderId) {
        try {
            let result = await this.service('http.societyFood').getOrderDetail(orderId);
            console.log("社会餐获取订单详情"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_ORDER_DETAIL';
    }
}
