import Command from '@/commands/Command';
import  _ from 'underscore'
export default class LoadStoreGoodsCommand extends Command {
    async handle (id, num = 1, type) {
        let response = await this.service('http.store').addMallGoodToCart(id, num);
        if (response) {
            console.log(_.isArray(response.data), '--- Is data an Array ---');
            if (_.isArray(response.data)) {
                this.model.user.store.dispatch('saveCartGoodsList', {
                    products: response
                });
            } else {
                this.$command('LOAD_CART_COMMAND', 'mall');
                this.model.user.store.dispatch('addToShoppingCart', {
                    goods: response.data
                });
            }
        }
    }

    static commandName () {
        return 'ADD_GOODS_TO_CART_COMMAND';
    }
}
