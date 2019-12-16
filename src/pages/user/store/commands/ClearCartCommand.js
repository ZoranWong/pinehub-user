import Command from '@/commands/Command';

export default class ClearCartCommand extends Command {
    async handle (type) {
        let response = await this.service('http.store').clearMallCart();


        // console.log('----- request -----', Date.now());
        this.model.user.store.dispatch('clearShoppingCart');
        this.model.user.order.payment.dispatch('clearIds')
        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'CLEAR_CART_COMMAND';
    }
}
