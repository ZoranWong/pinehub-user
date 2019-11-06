import Command from '../../../../commands/Command';
export default class AvailableCouponsCommand extends Command {
    async handle (type) {
        let response;
        if (type === 'mall') {
            response = await this.service('http.store').availableCoupons();
        } else {
            response = await this.service('http.merchandises').availableCoupons();
        }
        console.log('1111111111111111111');
        this.model.user.tickets.dispatch('saveAvailableCoupons', {
           coupons: response
        });
        
        
       
        console.log(response, '***********************MALL_AVAILABLE_COUPONS**************************');
    }
    static commandName () {
        return 'AVAILABLE_COUPONS';
    }
}
