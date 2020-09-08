import Command from '@/commands/Command';
export default class ActivateConsumerCardCommand extends Command {
    async handle (recordId) {
        let response = await this.service('http.account').cardActives(recordId);
        if (response && response.message) {
           await wx.showToast({
                title: response.message,
                icon: 'success',
                duration: 1000
            });
            console.log("========我日文化节=====")
            await this.$command('GET_ACTIVE_CARD', this);
            console.log("========丰富的非======")
        }
    }

    static commandName () {
        return 'ACTIVATECARD';
    }
}