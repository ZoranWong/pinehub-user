import Command from '@/commands/Command';
export default class OrderStatusUpdateCommand extends Command {
    // 取消订单
    async cancel (id) {
        let response = await this.service('http.orders').cancel(id);
        if (response.data) {
            wx.showToast({
                title: '订单已取消',
                icon: 'none'
            })
        }
    }
    // 核销订单
    async verification (id) {
        let response = await this.service('http.orders').confirmOrder(id);
        if (response.data) {
            wx.showToast({
                title: '订单已核销',
                icon: 'none'
            })
        }
    }
    // 确认收货
    async received (id) {
        let response = await this.service('http.orders').confirmOrder(id);
        if (response.data) {
            wx.showToast({
                title: '订单已收货',
                icon: 'none'
            })
        }
    }
    // 重新支付订单
    async payOrder (id) {
        let response = await this.service('http.orders').orderPayById(id);
        if (response) {
            console.log('支付返回信息', response);
            let timeStamp = response.sdk_config.timestamp;
            let nonceStr = response.sdk_config.nonceStr;
            let packageInfo = response.sdk_config.package;
            let paySign = response.sdk_config.paySign;
            let result = await this.mp.payment.pay(timeStamp, nonceStr, packageInfo, paySign);
            return result;
        }
    }
    refresh () {
        let self = this;
        setTimeout(function () {
            self.$application.$command('REDIRECT_TO', 'user.orders', 'replace');
        }, 1500);
    }
    async handle (type, id) {
        let self = this;
        if (type === 'pay') {
            await this.payOrder(id);
        } else if (type === 'cancel') {
            wx.showModal({
                title: '温馨提示',
                content: '确认取消此订单？',
                async success (res) {
                    if (res.confirm) {
                        await self.cancel(id);
                        self.refresh();
                    }
                }
            })
        } else if (type === 'verification') {
            wx.showModal({
                title: '温馨提示',
                content: '确认核销此订单？',
                async success (res) {
                    if (res.confirm) {
                        await self.verification(id);
                        self.refresh();
                    }
                }
            })
        } else if (type === 'received') {
            wx.showModal({
                title: '温馨提示',
                content: '此订单确认已收货？',
                async success (res) {
                    if (res.confirm) {
                        await self.received(id);
                        self.refresh();
                    }
                }
            })
        }
    }
    static commandName () {
        return 'ORDER_STATUS_UPDATE';
    }
}
