import Command from '@/commands/Command';
export default class SFDelCartShopCommand extends Command {
    async handle (shopId,productId,type) {
        try {
            let result = await this.service('http.societyFood').delSocietyFoodCartShop(shopId,productId,type);
            console.log("社会餐删除购物车内某商品"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_DEL_CART_SHOP';
    }
}
