import Command from '@/commands/Command';
export default class OrderStatusUpdateCommand extends Command {
    // 取消订单
    async cancel (id) {
        let response = await this.service('http.orders').cancelOrder(id);
        if (response.data) {
            wx.showToast({
                title: '订单已取消',
                icon: 'none'
            })
        }
    }

    // 再来一单
    onemore () {
        this.$application.$command('REDIRECT_TO', 'user.store', 'replace');
    }
    // 去取货
    pickup (order) {
        this.$application.$command('REDIRECT_TO', 'user.pickup', 'replace', {
            query: {
                order: JSON.stringify(order)
            }
        });
    }

    // 申请售后
    async feedback (id) {
        this.$application.$command('REDIRECT_TO', 'order.feedback', 'push', {
            query: {orderId: id}
        });
    }

    // 继续充值
    recharge = () => {
        this.$application.$command('REDIRECT_TO', 'user.recharge', 'push');
    };

    // 确认收货
    async confirmGot (order) {
        // 确认收货
        let response = await this.service('http.orders').confirmMpOrder(order);
        if (response.message === '订单已确认') {
            wx.showToast({
                title: '订单已确认收货',
                icon: 'none'
            })
        }
    };

    // 重新支付订单
    payOrder (order) {
        this.$application.$command('REDIRECT_TO', 'selectPay', 'push', {
            query: {
                order: JSON.stringify(order)
            }
        });
        // let response = await this.service('http.orders').orderPayById(id);
        // console.log(response, '---------pay response ----------');
        // if (response) {
        //     let timeStamp = response.sdk_config.timestamp;
        //     let nonceStr = response.sdk_config.nonceStr;
        //     let packageInfo = response.sdk_config.package;
        //     let paySign = response.sdk_config.paySign;
        //     let result = await this.mp.payment.pay(timeStamp, nonceStr, packageInfo, paySign);
        //     return result;
        // }
    }
    refresh () {
        let self = this;
        setTimeout(function () {
            self.$application.$command('REDIRECT_TO', 'user.orders', 'replace');
        }, 1500);
    }
    async handle (type, order) {
        let self = this;
        if (type === 'pay') {
            await this.payOrder(order);
        } else if (type === 'cancel') {
            wx.showModal({
                title: '温馨提示',
                content: '确认取消此订单？',
                async success (res) {
                    if (res.confirm) {
                        await self.cancel(order.id);
                        self.refresh();
                    }
                }
            })
        } else if (type === 'feedback') {
           self.feedback(order.id)
        } else if (type === 'onemore') {
            self.onemore()
        } else if (type === 'pickup') {
            self.pickup(order)
        } else if (type === 'recharge') {
            self.recharge()
        } else if (type === 'alreadyGetIt') {
            wx.showModal({
                title: '温馨提示',
                content: '确认收货吗？',
                async success (res) {
                    if (res.confirm) {
                        await self.confirmGot(order.id);
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
