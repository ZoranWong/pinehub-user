import Command from '../../../../../commands/Command';
import _ from 'underscore'
export default class CreatePayOrderCommand extends Command {
    async handle (actId, addId, coupons, date, time, carts) {
        let startTime = time.split('-')[0] + ':00';
        let endTime = time.split('-')[1] + ':00';
        let car = [];
        _.map(carts, (cart) => {
             let c = {};
             c['cart_id'] = cart.id;
             c['remark'] = cart.remark;
            car.push(c)
        });
        let response = await this.service('http.activities').createActOrder(actId, addId, coupons, date, startTime, endTime, car);
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
