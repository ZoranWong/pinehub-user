import Command from '@/commands/Command';

export default class AddToBreakfastCartCommand extends Command {
    async handle (id, num = 1) {
        console.log(id, '56555555555');
        let response = await this.service('http.store').addBreakfastGoodToCart(id, num);
        
       
        
        
        console.log(response, 'saassaassaasa --------');
    
        // console.log('----- request -----', Date.now());
        this.model.newEvents.shoppingCarts.dispatch('addMerchandiseToShoppingCart', {
            goods: response
        });
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'ADD_GOODS_TO_BREAKFAST_CART_COMMAND';
    }
}
