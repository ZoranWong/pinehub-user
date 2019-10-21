import Command from '@/commands/Command';

export default class CreateRechargeOrderCommand extends Command {
    async handle (id) {
        console.log(id);
        let response = await this.service('http.chargeCard').createRechargeOrder(id);
        console.log(response, '90909009900990090990099090');
        // this.model.user.recharge.dispatch('saveRechargeCards', {
        //     cards: response
        // });
        // this.$command('PAYMENT_BY_ID')
    }
    
    static commandName () {
        return 'CREATE_RECHARGE_ORDER';
    }
}
