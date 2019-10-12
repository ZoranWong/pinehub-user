import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (id, num = 1, type) {
        let response;
        if (type === 'mall') {
            response = await this.service('http.store').addMallGoodToCart(id, num);
            this.model.user.store.dispatch('addToShoppingCart', {
                goods: response
            });
        } else {
            response = await this.service('http.store').addBreakfastGoodToCart(id, num);
            this.model.newEvents.shoppingCarts.dispatch('addMerchandiseToShoppingCart', {
                goods: response
            });
        }
       
        
        
        console.log(response, 'saassaassaasa --------');
    
        // console.log('----- request -----', Date.now());
      
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'ADD_GOODS_TO_CART_COMMAND';
    }
}
