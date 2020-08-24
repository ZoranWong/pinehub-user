import Command from '@/commands/Command';
export default class SFShopListCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodShopList(param);
            console.log("社会餐门店列表"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SHOP_LIST';
    }
}
