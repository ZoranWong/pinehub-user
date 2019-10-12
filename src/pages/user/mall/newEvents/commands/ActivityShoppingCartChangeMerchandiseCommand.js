
import Command from '@/commands/ShoppingCartCommand';
import _ from 'underscore'
export default class ActivityShoppingCartChangeMerchandiseCommand extends Command {
    async handle (item, num) {
        if (num <= 0) {
            let response = await this.service('http.shoppingCart').deleteItem(item.id);
            this.model.newEvents.shoppingCarts.dispatch('removeGoodsFromCart', {
                goods: item
            });
            return
        }
        
        if (item['stock_num'] < num) {
            this.$application.popup.toast('库存不足', 'none', 2000);
            return
        }
        console.log('change', 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo');
    
    
        let response = await this.service('http.shoppingCart').activityShoppingCartChangeMerchandise(item.id, num);
        
        
        // console.log('----- request -----', Date.now());
        if (response) {
            this.model.newEvents.shoppingCarts.dispatch('changeBuyNum', {
                id: item.id,
                num: num
            });
        }
        
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'CHANGE_BREAKFAST_BUY_NUM_COMMAND';
    }
}
