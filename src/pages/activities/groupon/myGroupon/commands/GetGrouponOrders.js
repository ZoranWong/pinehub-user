import Command from '@/commands/Command';
import  _ from 'underscore'
export default class GetGrouponOrders extends Command {
    async handle (status) {
        let response = await this.service('http.groupon').getGrouponOrders(status);
        this.model.groupon.dispatch('saveGrouponOrders', {
            orders: response
        })
    }

    static commandName () {
        return 'GET_GROUPON_ORDERS';
    }
}
