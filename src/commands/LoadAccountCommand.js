import Command from './Command';

export default class MyInfoCommand extends Command {
    static handling = false;
    async handle (isShowLoadingPopup = true) {
        MyInfoCommand.handling = true;
        try {
            if (this.model.account.isMember) {
                let userInfo = await this.service('http.auth').showLoading(isShowLoadingPopup).getUserInfo();
                console.log(userInfo, ' user info');
                this.store().dispatch('model.account/setAccount', userInfo);
            }
        } catch (e) {
            console.log(e);
        }
        MyInfoCommand.handling = false;
    }

    static commandName () {
        return 'LOAD_ACCOUNT';
    }
}
