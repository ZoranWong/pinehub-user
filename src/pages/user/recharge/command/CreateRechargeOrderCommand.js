import Command from '@/commands/Command';

export default class CreateRechargeOrderCommand extends Command {
    async handle (id) {
        let response = await this.service('http.chargeCard').createRechargeOrder(id);
        console.log(response, '90909009900990090990099090');
        // this.model.user.recharge.dispatch('saveRechargeCards', {
        //     cards: response
        // });
    }
    
    static commandName () {
        return 'CREATE_RECHARGE_ORDER';
    }
}
