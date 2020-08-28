import Command from '@/commands/Command';
export default class SFShopDetailCommand extends Command {
    async handle (shopId,that) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodShopDetail(shopId);
            console.log("社会餐获取门店详情"+JSON.stringify(result.data));
            that.itemObj=result.data;
            that.fixedDelivery=result.data.fixed_delivery[0];
            let atOnceProList=result.data.order_now.products;
            for (let i = 0; i <atOnceProList.length ; i++) {
                atOnceProList[i]["count"]=0;
            }
            that.atOnceProList=atOnceProList;
            let orderInfoList=result.data.order_now.orders;
            if(orderInfoList.length>3){
                that.showMoreBtn=true;
                that.orderInfoList=orderInfoList.slice(0,3);
            }else {
                that.showMoreBtn=false;
                that.orderInfoList=orderInfoList;
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_SHOP_DETAIL';
    }
}
