import Command from '@/commands/Command';
export default class SFupdateUserAddressCommand extends Command {
    async handle (addressId) {
        try {
            let result = await this.service('http.societyFood').updateUserAddress(addressId);
            console.log("社会餐用户更新收货地址"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_UPDATE_USER_ADDRESS';
    }
}
