import Command from '@/commands/Command';

export default class MyOrderCommand extends Command {
    async handle (status, page = 1, limit = 5, type) {
        console.log(type);
        console.log('--------start get orders --------');
        if (page > 1) {
            let currentPage = this.store().getters['model.user.orders/currentPage'];
            let totalNum = this.store().getters['model.user.orders/totalNum'];
            console.log('NEXT_PAGE', currentPage, totalNum);
        }
        let [list, totalNum, currentPage, totalPage] = await this.service('http.orders').userOrders(status, page, limit);
        console.log(list, '--------- got lists --------------');
        if (type === 'pickup') {
            console.log('------------- go pickup --------------');
            this.model.user.pickup.dispatch('savePickupOrders', {
                orders: list
            })
        } else {
            console.log('--------- go orders ---------------');
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
        
        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_USER_ORDERS';
    }
}
