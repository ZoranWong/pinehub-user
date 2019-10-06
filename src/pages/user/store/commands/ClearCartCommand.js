import Command from '@/commands/Command';

export default class ClearCartCommand extends Command {
    async handle (type) {
        let response;
    
        if (type === 'mall') {
            response = await this.service('http.store').clearMallCart();
        } else if (type === 'breakfast') {
            // response = await this.service('http.store').addBreakfastGoodToCart(id, num);
        }
    
        // console.log('----- request -----', Date.now());
        this.model.user.store.dispatch('clearShoppingCart');
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'CLEAR_CART_COMMAND';
    }
}
