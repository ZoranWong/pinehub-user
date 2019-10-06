import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (id, num = 1) {
        let response;
        
        response = await this.service('http.store').addMallGoodToCart(id, num);
        
        
        console.log(response, 'saassaassaasa --------');
    
        // console.log('----- request -----', Date.now());
        this.model.user.store.dispatch('addToShoppingCart', {
            goods: response
        });
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'ADD_GOODS_TO_CART_COMMAND';
    }
}
