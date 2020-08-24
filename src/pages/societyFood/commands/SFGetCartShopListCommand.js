import Command from '@/commands/Command';
export default class SFGetCartShopListCommand extends Command {
    async handle (shopId) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodCartShopList(shopId);
            console.log("社会餐获取购物车商品列表"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_GET_CART_SHOP_LIST';
    }
}
