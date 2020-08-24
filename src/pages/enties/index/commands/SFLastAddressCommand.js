import Command from '@/commands/Command';
export default class SFLastAddressCommand extends Command {
    async handle (param) {
        try {
            let result = await this.service('http.societyFood').getLastShopAddress(param);
            console.log("社会餐上次选择的门店地址"+JSON.stringify(result))
        } catch (e) {
            throw e;
        }
    }
    static commandName () {
        return 'SF_LAST_ADDRESS';
    }
}
