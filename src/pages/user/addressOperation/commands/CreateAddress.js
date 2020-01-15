import Command from '../../../../commands/Command';
export default class CreateAddress extends Command {
    async handle (params) {
        let responses = await this.service('http.address').createAddress(params);
        let self = this;
        if (responses) {
            wx.showToast({
                title: '新建成功',
                icon: 'success'
            });
            setTimeout(function () {
                self.$application.$command('REDIRECT_TO', '', 'back');
            }, 2000);
        }
    }
    static commandName () {
        return 'CREATE_ADDRESS';
    }
}
