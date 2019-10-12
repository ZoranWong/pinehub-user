import Command from '../../../../commands/Command';
export default class CalculatePrice extends Command {
    async handle (type, params) {
        let respones;
        if (type === 'mall') {
            respones = await this.service('http.orders').calculateMallPrice(params);
        } else {
            respones = await this.service('http.orders').calculateBreakfastPrice(params);
        }
    
        console.log(respones, '---------------------calculated price ----------------------------');
        this.model.user.order.payment.dispatch('saveOrderInfo', {
            orderInfo: respones
        })
    }
    static commandName () {
        return 'CALCULATE_PRICE_COMMAND';
    }
}
