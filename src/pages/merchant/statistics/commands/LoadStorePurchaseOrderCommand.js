import Command from '@/commands/Command';

export default class LoadStorePurchaseOrderCommand extends Command {
    async handle(date, page = 1, limit = 15) {
        try {
            let [list, totalNum, currentPage, totalPage, pageCount, totalAmount] = await this.service('http.store').purchaseOrders(date, page, limit);
            let orders = {
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: pageCount
            };
            this.$store.dispatch('model.purchase.orders/setList', orders);
            this.$store.dispatch('model.purchase.orders/setTotalAmount', {totalAmount: totalAmount});
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    static commandName() {
        return 'LOAD_STORE_PURCHASE_ORDER';
    }
}
