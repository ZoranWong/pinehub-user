import Command from '../../../../commands/Command';
export default class CreatePayOrderCommand extends Command {
    async handle (id) {
        let response = await this.service('http.orders').getPaymentParams(id);
        
        
    }
    static commandName () {
        return 'GET_PAYMENT_PARAMS';
    }
}
