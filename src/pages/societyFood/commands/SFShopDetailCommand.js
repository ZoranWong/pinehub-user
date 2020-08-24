import Command from '@/commands/Command';
export default class SFShopDetailCommand extends Command {
    async handle (shopId) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodShopDetail(shopId);
            console.log("社会餐获取门店详情"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SHOP_DETAIL';
    }
}
