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
                    for (let j = 0; j <ordersList[i].order_items.length ; j++) {
                        let specValue=ordersList[i].order_items[j].spec_value;
                        let value="";
                        for(let key in specValue){
                            value+=key+":"+specValue[key]
                        }
                        ordersList[i].order_items[j]["specValue"]=value;
                    }
                    //仅在取货界面需要的参数
                    let time = new Date().getTime();
                    let content = {
                        "order_id": ordersList[i]['id'], 'time': time
                    };
                    let params = {
                        content: Base64.encode(JSON.stringify(content)), margin: 0, size: 200
                    };
                    ordersList[i].params = params;
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
