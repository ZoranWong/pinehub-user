import Command from '@/commands/Command';
export default class SFCanUseCouponsCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getCanUseCoupons(param);
            console.log("社会餐获取可用优惠卷"+JSON.stringify(result))
            that.couponTatal=result.meta.pagination.total,
            that.loadTickets=result.data
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_CAN_USE_COUPONS';
    }
}
