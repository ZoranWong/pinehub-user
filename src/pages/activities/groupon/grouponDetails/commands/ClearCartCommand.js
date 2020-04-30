import Command from '@/commands/Command';
import _ from 'underscore'
export default class ClearGrouponCartCommand extends Command {
    async handle (shop_shopping_group_id) {
        let response = await this.service('http.groupon').clearCart(shop_shopping_group_id);
        if (response) {
            this.model.groupon.dispatch('clearShoppingCart')
        }
    }

    static commandName () {
        return 'CLEAR_GROUPON_CART_COMMAND';
    }
}
