import Command from '@/commands/Command';
import  _ from 'underscore'
export default class AddGrouponGoodsToCartCommand extends Command {
    async handle (id, shop_shopping_group_id) {
        let response = await this.service('http.groupon').addToCart(id, shop_shopping_group_id);
        if (response) {
            this.model.groupon.dispatch('saveCartGoodsList', {
                products: response
            });
        }
    }

    static commandName () {
        return 'ADD_GROUPON_GOODS_TO_CART_COMMAND';
    }
}
