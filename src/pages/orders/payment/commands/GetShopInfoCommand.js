import Command from '@/commands/Command';
import _ from 'underscore'
export default class GetShopInfoCommand extends Command {
    async handle (id) {
        console.log(id, 'get shop info ');
        let result = await this.service('http.orders').getShopInfo(id);
        if (!_.isEmpty(result)) {
            this.model.user.order.payment.dispatch('saveShopInfo', {
                info: result
            });
        }
    }
    
    
    static commandName () {
        return 'GET_SHOP_INFO';
    }
}
