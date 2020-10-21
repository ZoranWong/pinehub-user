import Command from '@/commands/Command';
export default class SFUserGoodsAddressCommand extends Command {
    async handle (shopId,that) {
        try {
            let result = await this.service('http.societyFood').getUserGoodsAddress({"shop_id":shopId});
            console.log("社会餐获取用户收货地址"+JSON.stringify(result))
            let addressList=result.data;
            that.addressList=addressList;
            for (let i = 0; i <addressList.length ; i++) {
                if(that.checkedRadio==addressList[i].id){
                    that.addresses=addressList[i];
                }
            }
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_USER_GOODS_ADDRESS';
    }
}
