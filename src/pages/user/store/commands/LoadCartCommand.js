import Command from '@/commands/Command';

export default class LoadCartCommand extends Command {
    async handle (type, unchecked = [], changed = false) {
        let response;
        if (type === 'mall') {
            response = await this.service('http.store').cartGoodsList(unchecked, changed);
            this.model.user.store.dispatch('saveCartGoodsList', {
                products: response
            });
        } else if (type === 'breakfast') {
            response = await this.service('http.store').cartBreakfastGoodsList();
            this.model.newEvents.shoppingCarts.dispatch('saveBreakfastCartGoodsList', {
                products: response
            });
        }



        // console.log('----- request -----', Date.now());

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_CART_COMMAND';
    }
}
