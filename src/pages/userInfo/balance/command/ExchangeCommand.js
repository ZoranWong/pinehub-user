import Command from '@/commands/Command';
export default class ExchangeCommand extends Command {
    async handle (code) {
        let response = await this.service('http.account').exchange(code);
        if (response && response.message) {
            wx.showToast({
                title: response.message,
                icon: 'success'
            })
        }
    }

    static commandName () {
        return 'EXCHANGE';
    }
}
