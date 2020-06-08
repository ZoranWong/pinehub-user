import Command from '@/commands/Command';

export default class LoadPop extends Command {
    async handle (mode) {
        console.log(mode, ' ---------- index mode -----------------');
        try {
            let result = await this.service('http.account').popup(mode);
            if (mode === 'NEW_USER') {
                if (result.length) {
                    this.model.account.dispatch('hasNewUserCoupon', true)
                } else {
                    this.model.account.dispatch('hasNewUserCoupon', false)
                }
            } else {
                if (!result.length) {
                    this.model.account.dispatch('clearNewCoupons')
                } else {
                    this.model.account.dispatch('saveNewCoupons', {coupons: result})
                }
            }
        } catch (e) {
            throw e;
        }
    }

    static commandName () {
        return 'LOAD_POP';
    }
}
