import Command from '@/commands/Command';
export default class SFUserGoodsAddressCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').getUserGoodsAddress(param);
            console.log("社会餐获取用户收货地址"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_USER_GOODS_ADDRESS';
    }
}
