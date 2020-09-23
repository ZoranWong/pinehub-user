import Command from '@/commands/Command';
export default class SFupdateUserAddressCommand extends Command {
    async handle (addressId,param,that) {
        try {
            let result = await this.service('http.societyFood').updateUserAddress(addressId,param);
            console.log("社会餐用户更新收货地址"+JSON.stringify(result));
            that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {query: {"shopDetail":that.shopDetail}});
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_UPDATE_USER_ADDRESS';
    }
}
