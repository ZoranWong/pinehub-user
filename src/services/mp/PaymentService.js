import Service from '@/services/Service';
export default class PaymentService extends Service {
    // 调用微信支付接口
    pay(timeStamp, nonceStr, packageInfo, paySign) {
        let self = this;
        return new Promise((resolve) => {
            wx.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': packageInfo,
                'signType': 'MD5',
                'paySign': paySign,
                'success': function (res) {
                    resolve(true);
                },
                'fail': function (res) {
                    resolve(false);
                },
                'complete': function (res) {
                    console.log('支付结束', res);
                }
            })
        });
    }

}
