import Command from '@/commands/Command';
export default class SFUpdateCartCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').updateSocietyFoodCart(param);
            console.log("社会餐更新购物车"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_UPDATE_CART';
    }
}
