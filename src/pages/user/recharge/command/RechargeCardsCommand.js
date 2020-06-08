import Command from '@/commands/Command';

export default class RechargeCardsCommand extends Command {
    async handle () {
        let response = await this.service('http.chargeCard').rechargeCards();
        
        this.model.user.recharge.dispatch('saveRechargeCards', {
            cards: response
        });
    }
    
    static commandName () {
        return 'RECHARGE_CARDS';
    }
}
