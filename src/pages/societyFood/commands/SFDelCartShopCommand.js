import Command from '@/commands/Command';
export default class SFDelCartShopCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').delSocietyFoodCartShop(param);
            console.log("社会餐删除购物车内某商品"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_DEL_CART_SHOP';
    }
}
