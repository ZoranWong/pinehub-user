import Command from '@/commands/Command';
export default class SFSubmitOrderCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').onSubmitOrder(param);
            console.log("社会餐提交订单"+JSON.stringify(result.data.order_id));
            that.$command('REDIRECT_TO', 'selectPay', 'push', {
                query: {
                    order:JSON.stringify(result.data)
                }
            })
            that.$command('GET_PAYMENT_PARAMS',result.data.order_id);
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SUBMIT_ORDER';
    }
}
