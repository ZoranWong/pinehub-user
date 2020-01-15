import Command from '../../../../commands/Command';
export default class OrderDetailCommand extends Command {
    async handle (id) {
        let response = await this.service('http.orders').orderDetail(id);
        this.model.user.order.detail.dispatch('saveOrderDetail', {
            orderDetail: response
        })
    }
    static commandName () {
        return 'ORDER_DETAIL';
    }
}
