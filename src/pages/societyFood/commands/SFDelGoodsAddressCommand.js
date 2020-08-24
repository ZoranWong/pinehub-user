import Command from '@/commands/Command';
export default class SFDelGoodsAddressCommand extends Command {
    async handle (addressId) {
        try {
            let result = await this.service('http.societyFood').delGoodsAddress(addressId);
            console.log("社会餐删除收货地址"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_DEL_GOODS_ADDRESS';
    }
}
