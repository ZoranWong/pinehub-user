import Command from '@/commands/Command';

export default class LoadGrouponCartCommand extends Command {
    async handle (shop_shopping_group_id) {
        let response = await this.service('http.groupon').getGrouponCarts(shop_shopping_group_id);
        if (response && response.data) {
            this.model.groupon.dispatch('saveCartGoodsList', {
                products: response
            })
        }

        // console.log('----- request -----', Date.now());

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_GROUPON_CART_COMMAND';
    }
}
