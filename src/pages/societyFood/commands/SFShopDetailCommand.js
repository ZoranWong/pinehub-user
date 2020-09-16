import Command from '@/commands/Command';
export default class SFShopDetailCommand extends Command {
    async handle (shopId,that) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodShopDetail(shopId);
            console.log("社会餐获取门店详情"+JSON.stringify(result.data));
            let itemObj=result.data;
            that.money=itemObj.amount_fee;
            that.fixedDelivery=itemObj.fixed_delivery[0];
            let atOnceProList=itemObj.order_now.products;
            for (let i = 0; i <atOnceProList.length ; i++) {
                atOnceProList[i]["count"]=0;
            }
            that.atOnceProList=atOnceProList;
            that.itemObj=itemObj;
            if(itemObj.support_self_pick){
                that.selectedStyle="2"
            }
            if(itemObj.support_home_delivery){
                that.selectedStyle="1"
            }
            if(itemObj.support_home_delivery && itemObj.support_self_pick){
                that.selectedStyle="0"
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SHOP_DETAIL';
    }
}
