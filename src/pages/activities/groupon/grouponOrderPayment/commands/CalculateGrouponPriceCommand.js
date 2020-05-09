import Command from '@/commands/Command';
import _ from 'underscore'
export default class CalculateGrouponPrice extends Command {
    async handle (params) {
        try {
            let  respones = await this.service('http.groupon').calculateGrouponPrice(params);
            if (_.isEmpty(respones)) {
                wx.showToast({
                    title: '当前订单不可使用该优惠券',
                    icon: 'none'
                });
            } else {
                this.model.groupon.dispatch('saveOrderInfo', {
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
            this.model.groupon.dispatch('deleteId')
        }
    }
    static commandName () {
        return 'CALCULATE_GROUPON_PRICE_COMMAND';
    }
}
