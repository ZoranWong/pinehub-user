import Command from '@/commands/Command';

export default class ChangeGrouponBuyNumCommand extends Command {
    async handle (item,shop_shopping_group_id, num) {
        if (num <= 0) {
            let response = await this.service('http.groupon').clearProductCart(item['product_stock_id'], shop_shopping_group_id);
            this.$command('LOAD_GROUPON_CART_COMMAND', shop_shopping_group_id);
            this.model.groupon.dispatch('removeGoodsFromCart', {
                goods: item
            });
            return
        }
        console.log(item, '=======');
        if (item['stock_num'] < num) {
            this.$application.popup.toast('库存不足', 'none', 2000);
            return
        }



        let response = await this.service('http.groupon').changeBuyNum(item['product_stock_id'], shop_shopping_group_id, num);



        // console.log('----- request -----', Date.now());
        if (response) {
            this.model.groupon.dispatch('changeBuyNum', {
                id: item.id,
                num: num
            });
            this.model.groupon.dispatch('saveCartGoodsList', {
                products: response
            });
        }

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'CHANGE_GROUPON_BUY_NUM_COMMAND';
    }
}
