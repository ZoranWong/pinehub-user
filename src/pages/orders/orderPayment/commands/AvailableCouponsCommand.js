import Command from '../../../../commands/Command';
export default class AvailableCouponsCommand extends Command {
    async handle (type, page = 1) {
        if (page === 1) {
            this.model.user.tickets.dispatch('clearAvailableCoupons')
        }
        let response;
        if (type === 'mall') {
            response = await this.service('http.store').availableCoupons(page);
            console.log(response, '+++++');
        } else if (this.type === 'breakfast') {
            response = await this.service('http.merchandises').availableCoupons(page);
        }
        this.model.user.tickets.dispatch('saveAvailableCoupons', {
           coupons: response.data
        });

        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('AVAILABLE_COUPONS', type, page + 1)
        }
    }
    static commandName () {
        return 'AVAILABLE_COUPONS';
    }
}
