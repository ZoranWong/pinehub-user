import Command from '@/commands/Command';
export default class SFTomorrowShopListCommand extends Command {
    async handle (that) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodTomorrowShopList();
            console.log("获取预定明日的社会餐商品列表"+JSON.stringify(result))
            let reserveProList=result.data;
            for (let i = 0; i <reserveProList.length ; i++) {
                reserveProList[i]["count"]=0;
            }
            that.reserveProList=reserveProList;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_TOMORROW_SHOP_LIST';
    }
}
