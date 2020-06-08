import Command from '@/commands/ShoppingCartCommand';
export default class ActivityShoppingCartClearMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
  }
    async handle (type) {
        let response = await this.service('http.store').clearBreakfastCart();
        
        
        // console.log('----- request -----', Date.now());
        if (response) {
            this.model.newEvents.shoppingCarts.dispatch('deleteMerchandiseFromShoppingCart');
        }
        
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'CLEAR_BREAKFAST_CART_COMMAND';
    }
}
