import Command from '@/commands/Command';
export default class SFGetCartShopListCommand extends Command {
    async handle (shopId,that) {
        try {
            let onceResult = await this.service('http.societyFood').getSocietyFoodCartShopList(shopId,{cart_type:6});
            let reserveResult = await this.service('http.societyFood').getSocietyFoodCartShopList(shopId,{cart_type:7});
            console.log("立即订餐购物车商品列表"+JSON.stringify(onceResult));
            console.log("预定明日购物车商品列表"+JSON.stringify(reserveResult));
            that.atOnceCartList=onceResult.data;
            that.reserveCartList=reserveResult.data;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_GET_CART_SHOP_LIST';
    }
}
