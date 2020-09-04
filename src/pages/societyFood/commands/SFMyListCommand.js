import Command from '@/commands/Command';
export default class SFMyListCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getMySocietyFoodList(param);
            console.log("我的社会餐订单列表"+JSON.stringify(result));
            if(result.data){
               let ordersList=result.data;
                for (let i = 0; i <ordersList.length ; i++) {
                    if(ordersList[i].order_no.length>15){
                        ordersList[i]["orderNo"]=ordersList[i].order_no.substr(0,15)+"...";
                    }else {
                        ordersList[i]["orderNo"]=ordersList[i].order_no;
                    }
                }
                that.ordersList=ordersList;
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_MY_LIST';
    }
}
