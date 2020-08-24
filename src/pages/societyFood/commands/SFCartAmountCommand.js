import Command from '@/commands/Command';
export default class SFCartAmountCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodCartAmount(param);
            console.log("社会餐购物车金额计算"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_CART_AMOUNT';
    }
}
