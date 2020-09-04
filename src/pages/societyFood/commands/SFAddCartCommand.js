import Command from '@/commands/Command';
export default class SFAddCartCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').addSocietyFoodCart(param);
            console.log("社会餐添加购物车"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_ADD_CART';
    }
}
