import Command from '@/commands/Command';
export default class SFUserGoodsAddressCommand extends Command {
    async handle (shopId,that) {
        try {
            let result = await this.service('http.societyFood').getUserGoodsAddress({"shop_id":shopId});
            console.log("社会餐获取用户收货地址"+JSON.stringify(result))
            that.addressList=result.data;
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_USER_GOODS_ADDRESS';
    }
}
