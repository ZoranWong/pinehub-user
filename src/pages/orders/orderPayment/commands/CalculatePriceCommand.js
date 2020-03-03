import Command from '../../../../commands/Command';
import _ from 'underscore'
export default class CalculatePrice extends Command {
    async handle (type, params) {
        console.log(type, '===========');
        console.log(params, '===========');
        try {
            let respones;
            if (type === 'mall') {
                respones = await this.service('http.orders').calculateMallPrice(params);
            } else if (this.type === 'breakfast') {
                respones = await this.service('http.orders').calculateBreakfastPrice(params);
            } else if (this.type === 'activity') {
                respones = await this.service('http.activities').calculateActCart(params);
            }
            if (_.isEmpty(respones)) {
                wx.showToast({
                    title: '当前订单不可使用该优惠券',
                    icon: 'none'
                });
            } else {
                this.model.user.order.payment.dispatch('saveOrderInfo', {
                    orderInfo: respones.data
                })
            }
            console.log(respones, '---------------------calculated price ----------------------------');
        } catch (e) {
            console.log(e, '.......................');
            let message = e.response && e.response.data && e.response.data.message ? e.response.data.message : e;

            if (message === '422 Unprocessable Entity') {
                wx.showToast({
                    title: '该笔订单暂不支持使用此优惠券',
                    icon: 'none'
                });
            }
            this.model.user.order.payment.dispatch('deleteId')
        }
    }
    static commandName () {
        return 'CALCULATE_PRICE_COMMAND';
    }
}
