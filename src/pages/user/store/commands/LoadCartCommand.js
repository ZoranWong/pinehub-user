import Command from '@/commands/Command';

export default class LoadCartCommand extends Command {
    async handle (type) {
        let response;
        
        response = await this.service('http.store').cartGoodsList();
      
        
        console.log(response, 'saassaassaasa --------');
        
        // console.log('----- request -----', Date.now());
        this.model.user.store.dispatch('saveCartGoodsList', {
            products: response
        });
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'LOAD_CART_COMMAND';
    }
}
