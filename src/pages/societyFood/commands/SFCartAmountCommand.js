import Command from '@/commands/Command';
export default class SFCartAmountCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').getSocietyFoodCartAmount(param);
            console.log("社会餐购物车金额计算"+JSON.stringify(result));
            let buyShopList=result.data.order_items;
            for (let i = 0; i <buyShopList.length ; i++) {
                let specValue=buyShopList[i].spec_value;
                if(!specValue){
                    buyShopList[i].spec_value="无";
                }else {
                    let value="";
                    for(let key in specValue){
                        value+=key+":"+specValue[key]
                    }
                    buyShopList[i].spec_value=value;
                }
            }
            that.buyShopList=buyShopList;
            that.userInfo=result.data.user_info;
            that.shopInfo=result.data.shop;
            that.itemObj=result.data;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_CART_AMOUNT';
    }
}
