import Command from '../../../../commands/Command';
export default class AvailableCouponsCommand extends Command {
    async handle () {
        let response = await this.service('http.store').availableCoupons();
        console.log(response, '***********************MALL_AVAILABLE_COUPONS**************************');
    }
    static commandName () {
        return 'MALL_AVAILABLE_COUPONS';
    }
}
