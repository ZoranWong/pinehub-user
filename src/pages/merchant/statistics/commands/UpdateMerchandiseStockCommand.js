import Command from '@/commands/Command';

export default class UpdateMerchandiseStockCommand extends Command {
    async handle (id, primaryStockNum, modifyStockNum, reason, comment = '') {
        try {
            let response = await this.service('http.store').modifyStock(id, primaryStockNum, modifyStockNum, reason, comment);
            this.$store.dispatch('model.merchant.store.merchandises/updateMerchandiseStock', {
                'id': response['id'],
                'stockNum': response['stock_num']
            });

            if (response) {
                wx.hideLoading()
                wx.showToast({
                    title: '修改成功',
                    icon: 'none'
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    static commandName () {
        return 'UPDATE_MERCHANDISE_STOCK';
    }
}
