import Command from '../../../../commands/Command';
export default class AvailableCouponsCommand extends Command {
    async handle (type) {
        let response;
        if (type === 'mall') {
            response = await this.service('http.store').availableCoupons();
        } else if (this.type === 'breakfast') {
            response = await this.service('http.merchandises').availableCoupons();
        } else if (this.type === '活动') {

        }
        this.model.user.tickets.dispatch('saveAvailableCoupons', {
           coupons: response
        });
    }
    static commandName () {
        return 'AVAILABLE_COUPONS';
    }
}
