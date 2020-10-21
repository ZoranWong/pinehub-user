import Command from '@/commands/Command';
export default class SFDelGoodsAddressCommand extends Command {
    async handle (addressId,that) {
        try {
            let result = await this.service('http.societyFood').delGoodsAddress(addressId);
            console.log("社会餐删除收货地址"+JSON.stringify(result));
            wx.showToast({
                title: result.message,
                icon: 'none',
                duration: 2000
            });
            that.$command('SF_USER_GOODS_ADDRESS',that.shopDetail.shop_id,that);
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_DEL_GOODS_ADDRESS';
    }
}
