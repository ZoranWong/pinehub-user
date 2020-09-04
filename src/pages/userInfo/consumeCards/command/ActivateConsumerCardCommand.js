import Command from '@/commands/Command';
export default class ActivateConsumerCard extends Command {
    async handle (recordId) {
        let response = await this.service('http.account').cardActives(recordId);
        if (response && response.message) {
           await wx.showToast({
                title: response.message,
                icon: 'success',
                duration: 1000
            });
            await this.$command('LOAD_EXCHANGE_RECORDS')
            await this.$command('LOAD_MY_CONSUME_CARDS') 
        }
    }

    static commandName () {
        return 'ACTIVATECARD';
    }
}
