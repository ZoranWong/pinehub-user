import Command from '../../../../commands/Command';
export default class CreateAddress extends Command {
    async handle (params, isPayment, isActivity, actId) {
        console.log(isPayment, 'isPayment');
        let responses = await this.service('http.address').createAddress(params);
        let self = this;
        if (responses) {
            wx.showToast({
                title: '新建成功',
                icon: 'success'
            });
            if (isPayment) {
                // if (isActivity) {
                //     this.model.activity.dispatch('saveAddress', {
                //         address: params
                //     });
                //     setTimeout(function () {
                //         self.$command('REDIRECT_TO', 'user.activity.payment', 'push', {
                //             query: {type: 'activity', actId: actId}
                //         });
                //     }, 2000);
                // } else {
                //     this.model.user.order.payment.dispatch('saveMallAddress', {
                //         address: params
                //     });
                //     setTimeout(function () {
                //         self.$command('REDIRECT_TO', 'user.order.payment', 'push', {
                //             query: {type: 'mall'}
                //         });
                //     }, 2000);
                // }
                self.$command('REDIRECT_TO', '', 'back')
            } else {
                setTimeout(function () {
                    self.$application.$command('REDIRECT_TO', '', 'back');
                }, 2000);
            }
        }
    }
    static commandName () {
        return 'CREATE_ADDRESS';
    }
}
