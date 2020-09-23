import Command from '@/commands/Command';
export default class SFInsertUserAddressCommand extends Command {
    async handle (param,that) {
        try {
            let result = await this.service('http.societyFood').insertUserAddress(param);
            console.log("社会餐用户新增收货地址"+JSON.stringify(result))
            that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {query: {"shopDetail":that.shopDetail}});
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_INSERT_USER_ADDRESS';
    }
}
