import Command from '../../../../../commands/Command';
import _ from 'underscore'
export default class CalculatePrice extends Command {
    async handle (type, params) {
        try {
            let respones = await this.service('http.activities').calculateActCart(params);
            if (_.isEmpty(respones)) {
                wx.showToast({
                    title: '当前订单不可使用该优惠券',
                    icon: 'none'
                });
            } else {
                this.model.activity.dispatch('saveOrderInfo', {
                    orderInfo: respones
                })
            }
            console.log(respones, '---------------------calculated price ----------------------------');
        } catch (e) {
            let message = e.response && e.response.data && e.response.data.message ? e.response.data.message : e;
            if (message === '422 Unprocessable Entity') {
                wx.showToast({
                    title: '该笔订单暂不支持使用此优惠券',
                    icon: 'none'
                });
                this.model.activity.dispatch('deleteId')
            }
        }
    }
    static commandName () {
        return 'CALCULATE_ACTIVITY_PRICE_COMMAND';
    }
}
