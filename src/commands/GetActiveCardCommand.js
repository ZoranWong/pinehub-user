import Command from '@/commands/Command';
export default class GetActiveCardCommand extends Command {
    async handle (that) {
        let response = await this.service('http.account').getActivationCard();
        console.log("=================response=============",response)
        this.model.account.dispatch('saveGetActiveCard', {
            getActivationCards: response.data,
        });
        // that.activationCards=response.data.phone
    }

    static commandName () {
        return 'GET_ACTIVE_CARD';
    }
}