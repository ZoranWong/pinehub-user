import Command from '@/commands/Command';

export default class CleanCarts extends Command {
    async handle () {
        this.model.user.store.dispatch('clearShoppingCart', []);
    }

    static commandName () {
        return 'CLEAN_CARTS_COMMAND';
    }
}
