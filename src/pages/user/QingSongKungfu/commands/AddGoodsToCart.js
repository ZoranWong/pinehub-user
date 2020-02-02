import Command from '@/commands/Command';

export default class AddGoodsToCartCommand extends Command {
    async handle (id, num = 1, type, actId) {
        let response = await this.service('http.activities').addActGoodToCart(id, num, actId);
        this.model.activity.dispatch('addToShoppingCart', {
            goods: response
        });
        this.model.activity.dispatch('clearIds');
    }

    static commandName () {
        return 'ADD_GOODS_TO_ACTIVITY_CART_COMMAND';
    }
}
