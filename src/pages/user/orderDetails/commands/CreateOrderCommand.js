import Command from '../../../../commands/Command';
export default class CreateOrderCommand extends Command {
    async handle (type, id) {
        let response = await this.service('http.orders').orderPayById(id);
        if (response) {
        
        }
        return false;
    }
    static commandName () {
        return 'PAY_ORDER';
    }
}
