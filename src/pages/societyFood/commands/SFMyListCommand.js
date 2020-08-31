import Command from '@/commands/Command';
export default class SFMyListCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getMySocietyFoodList(param);
            console.log("我的社会餐订单列表"+JSON.stringify(result));
            if(result.data){
               that.ordersList=result.data;
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_MY_LIST';
    }
}
