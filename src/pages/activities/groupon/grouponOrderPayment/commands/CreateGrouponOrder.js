import Command from '@/commands/Command';
import  _ from 'underscore'
export default class CreateGrouponOrder extends Command {
    async handle (params) {
        let response = await this.service('http.groupon').createGrouponOrder(params);
        console.log(response);
        if (!_.isEmpty(response)) {
            this.model.groupon.dispatch('saveCreatedOrderInfo', {
                orderInfo: response
            });
            this.model.groupon.dispatch('clearShoppingCart');
            this.model.groupon.dispatch('clearIds');
            this.$command('REDIRECT_TO', 'selectPay', 'push', {
                query: {
                    type: 'groupon'
                }
            })
        }
    }

    static commandName () {
        return 'CREATE_GROUPON_ORDER';
    }
}
