import Command from '@/commands/Command';
export default class MyOrderCommand extends Command {
    async handle (status, page = 1, limit = 5) {
        if (page > 1) {
            let currentPage = this.store().getters['model.user.orders/currentPage'];
            let totalNum = this.store().getters['model.user.orders/totalNum']
            console.log('NEXT_PAGE', currentPage, totalNum);
        }
        let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').userOrders(status, page, limit);
        this.store().dispatch({
            type: 'model.user.orders/setList',
            list: list,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit,
            status: status
        });
    }
    static commandName () {
        return 'LOAD_USER_ORDERS';
    }
}
