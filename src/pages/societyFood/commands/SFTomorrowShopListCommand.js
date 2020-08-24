import Command from '@/commands/Command';
export default class SFTomorrowShopListCommand extends Command {
    async handle () {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodTomorrowShopList();
            console.log("获取预定明日的社会餐商品列表"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_TOMORROW_SHOP_LIST';
    }
}
