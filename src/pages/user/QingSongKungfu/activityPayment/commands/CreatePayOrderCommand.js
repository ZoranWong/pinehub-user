import Command from '../../../../../commands/Command';
import _ from 'underscore'
export default class CreatePayOrderCommand extends Command {
    async handle (actId, addId, coupons) {
        let response = await this.service('http.activities').createActOrder(actId, addId, coupons);
        if (!_.isEmpty(response)) {
            this.model.user.order.payment.dispatch('saveCreatedOrderInfo', {
                orderInfo: response
            });
            this.model.activity.dispatch('clearIds');
            this.model.activity.dispatch('clearShoppingCart');

            this.$command('GET_PAYMENT_PARAMS', response.id);

            this.$command('REDIRECT_TO', 'selectPay', 'replace', {
                query: {
                    type: 'activity'
                }
            });

        }





    }
    static commandName () {
        return 'CREATE_ACTIVITY_PAY_ORDER';
    }
}
