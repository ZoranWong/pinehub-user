import Command from '@/commands/Command';
export default class LoadDeliveryOrdersCommand extends Command {
    async handle (date, batch, page = 1, limit = 15) {
        try {
            let [list, totalNum, currentPage, totalPage, pageCount] = await this.service('http.orders').sendOrders(date, batch, page, limit);
            this.$store.dispatch('model.delivery.orders/setList', {
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: pageCount
            });
        } catch (e) {
            console.log('抛出异常', e);
            throw e;
        }
    }

    static commandName () {
        return 'LOAD_DELIVERY_ORDERS';
    }
}
