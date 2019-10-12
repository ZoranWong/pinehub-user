import Command from '../../../../commands/Command';
export default class CreatePayOrderCommand extends Command {
    async handle (params, type) {
        let response;
        console.log(type, '---------------------------type--------------------------------');
        if (type === 'mall') {
            response = await this.service('http.orders').createPaymentOrder(params);
        } else {
            response = await this.service('http.orders').createBreakfastPaymentOrder(params);
        }
        this.model.user.order.payment.dispatch('saveCreatedOrderInfo', {
            orderInfo: response
        });
    
    
        this.$command('GET_PAYMENT_PARAMS', response.id)
    }
    static commandName () {
        return 'CREATE_PAY_ORDER';
    }
}
