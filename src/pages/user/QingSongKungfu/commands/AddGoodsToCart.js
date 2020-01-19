import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (id, num = 1, type) {
        let response = await this.service('http.store').addMallGoodToCart(id, num);
            this.model.user.store.dispatch('addToShoppingCart', {
                goods: response
            });

            this.model.user.order.payment.dispatch('clearIds');




        console.log(response, 'saassaassaasa --------');

        // console.log('----- request -----', Date.now());

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'ADD_GOODS_TO_ACTIVITY_CART_COMMAND';
    }
}
