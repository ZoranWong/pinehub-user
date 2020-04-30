import Command from '../../../../commands/Command';
export default class EditAddress extends Command {
    async handle (params, id) {
        let responses = await this.service('http.address').editAddress(params,id);
        let self = this;
        if (responses) {
            wx.showToast({
                title: '编辑成功',
                icon: 'success'
            });
            setTimeout(function () {
                self.$application.$command('REDIRECT_TO', '', 'back');
            }, 2000);
        }
    }
    static commandName () {
        return 'EDIT_ADDRESS';
    }
}
