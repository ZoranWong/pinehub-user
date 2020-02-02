import Command from '../../../../commands/Command';
import _ from 'underscore'
export default class CreatePayOrderCommand extends Command {
    async handle (params, type) {
        let response;
        console.log(type, '---------------------------type--------------------------------');
        if (type === 'mall') {
            response = await this.service('http.orders').createPaymentOrder(params);
        } else if (this.type === 'breakfast') {
            response = await this.service('http.orders').createBreakfastPaymentOrder(params);
        }
        if (!_.isEmpty(response)) {
            this.model.user.order.payment.dispatch('saveCreatedOrderInfo', {
                orderInfo: response
            });
            this.model.user.order.payment.dispatch('clearIds');

            if (type === 'mall') {
                this.model.user.store.dispatch('clearShoppingCart');
                this.model.user.store.dispatch('selectPoints', {
                    boolean: false,
                    type: type
                })
            } else if (this.type === 'breakfast') {
                this.model.newEvents.shoppingCarts.dispatch('deleteMerchandiseFromShoppingCart');
                this.model.newEvents.shoppingCarts.dispatch('selectPoints', {
                    boolean: false,
                    type: type
                })
            }

            this.$command('REDIRECT_TO', 'selectPay', 'replace', {
                query: {
                    type: type
                }
            })
        }




        this.$command('GET_PAYMENT_PARAMS', response.id)
    }
    static commandName () {
        return 'CREATE_PAY_ORDER';
    }
}
