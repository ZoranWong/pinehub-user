import Command from '@/commands/Command';
export default class SFSubmitOrderCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').onSubmitOrder(param);
            console.log("社会餐提交订单"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SUBMIT_ORDER';
    }
}
