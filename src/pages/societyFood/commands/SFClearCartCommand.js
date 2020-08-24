import Command from '@/commands/Command';
export default class SFClearCartCommand extends Command {
    async handle (shopId) {
        try {
            let result = await this.service('http.societyFood').clearSocietyFoodCart(shopId);
            console.log("社会餐清空购物车"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_CLEAR_CART';
    }
}
