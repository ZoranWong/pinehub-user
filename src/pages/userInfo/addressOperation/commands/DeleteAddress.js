import Command from '../../../../commands/Command';
export default class DeleteAddress extends Command {
    async handle (id) {
        if (id) {
            let responses;
            let self = this;
            wx.showModal({
                title: '温馨提示',
                content: '确认删除该收货地址吗？',
                async success (res) {
                    if (res.confirm) {
                        responses = await self.service('http.address').deleteAddress(id);
                        if (responses) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            });
                            setTimeout(function () {
                                self.$application.$command('REDIRECT_TO', '', 'back');
                            }, 2000);
                        }
                    }
                }
            });
        }
    }
    static commandName () {
        return 'DELETE_ADDRESS';
    }
}
