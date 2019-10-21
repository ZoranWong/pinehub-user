import Command from './Command';

export default class MyInfoCommand extends Command {
    static handling = false;
    async handle (isShowLoadingPopup = true) {
        
        console.log('-------- user info ---------', MyInfoCommand.handling);
       
        MyInfoCommand.handling = true;
        try {
            console.log('-------- user info ---------');
            if (this.model.account.isMember) {
                let userInfo = await this.service('http.auth').showLoading(isShowLoadingPopup).getUserInfo();
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
