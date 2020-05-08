import Command from '@/commands/Command';
export default class GroupAvailableCouponsCommand extends Command {
    async handle (id, page = 1) {
        if (page === 1) {
            this.model.user.tickets.dispatch('clearAvailableCoupons')
        }
        let response = await this.service('http.groupon').availableCoupons(id);
        console.log(response, '***********');
        this.model.user.tickets.dispatch('saveAvailableCoupons', {
            coupons: response.data
        });

        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('GROUPON_AVAILABLE_COUPONS', id, page + 1)
        }
    }
    static commandName () {
        return 'GROUPON_AVAILABLE_COUPONS';
    }
}
