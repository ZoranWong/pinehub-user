import Command from '@/commands/Command';

export default class ChangeBuyNumCommand extends Command {
    async handle (item, num) {
        if (num <= 0) {
            let response = await this.service('http.store').deleteItem(item.id);
            this.model.user.store.dispatch('removeGoodsFromCart', {
                goods: item
            });
            return
        }
        
        if (item['stock_num'] < num) {
            this.$application.popup.toast('库存不足', 'none', 2000);
            return
        }
        
        
        
        let response = await this.service('http.store').changeBuyNum(item.id, num);
      
        
        // console.log('----- request -----', Date.now());
        if (response) {
            this.model.user.store.dispatch('changeBuyNum', {
                id: item.id,
                num: num
            });
        }
        
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'CHANGE_BUY_NUM_COMMAND';
    }
}
