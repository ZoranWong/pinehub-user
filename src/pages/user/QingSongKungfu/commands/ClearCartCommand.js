import Command from '@/commands/Command';

export default class ClearCartCommand extends Command {
    async handle (actId) {
        let response = await this.service('http.activities').clearMallCart(actId);


        // console.log('----- request -----', Date.now());
        this.model.activity.dispatch('clearShoppingCart');
        this.model.activity.dispatch('clearIds')
        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'CLEAR_ACTIVITY_CART_COMMAND';
    }
}
