import Command from '@/commands/Command';
import _ from 'underscore'
export default class ClearCartCommand extends Command {
    async handle (checkedAry = []) {
        let self = this;
        wx.showModal({
            title: '温馨提示',
            content: `确定删除这些商品吗？`,
            async success (res) {
                if (res.confirm) {
                    this.model.user.order.payment.dispatch('clearIds');
                    if (!checkedAry.length || checkedAry.length === self.model.user.store.goodInShoppingCart.length) {
                        let response = await self.service('http.store').clearMallCart();
                        self.$command('LOAD_CART_COMMAND', 'mall');
                    } else {
                        _.map(checkedAry, async (item) => {
                            await self.$command('CHANGE_BUY_NUM_COMMAND', item, 0);
                            self.$command('LOAD_CART_COMMAND', 'mall')
                        });
                        self.model.user.store.dispatch('clearShoppingCart', checkedAry);
                    }
                }
            }
        })



    }

    static commandName () {
        return 'CLEAR_CART_COMMAND';
    }
}
