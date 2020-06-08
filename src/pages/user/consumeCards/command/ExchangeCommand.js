import Command from '@/commands/Command';
export default class ExchangeCommand extends Command {
    async handle (code) {
        let response = await this.service('http.account').exchange(code);
        if (response && response.message) {
            wx.showToast({
                title: response.message,
                icon: 'success'
            });
            setTimeout(()=>{
                this.$command('LOAD_EXCHANGE_RECORDS')
                this.$command('LOAD_MY_CONSUME_CARDS')
            }, 1500)
        }
    }

    static commandName () {
        return 'EXCHANGE';
    }
}
