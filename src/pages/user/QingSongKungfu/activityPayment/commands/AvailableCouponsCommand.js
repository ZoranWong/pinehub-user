import Command from '../../../../../commands/Command';
export default class AvailableCouponsCommand extends Command {
    async handle (id) {
        let response = await this.service('http.activities').actAvailableCoupons(id);
        this.model.activity.dispatch('saveAvailableCoupons', {
           coupons: response
        });
    }
    static commandName () {
        return 'ACTIVITY_AVAILABLE_COUPONS';
    }
}
