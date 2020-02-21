import Command from '@/commands/Command';

export default class BindConsumerCommand extends Command {
    async handle (id, reset = false) {
        let result = await this.http.account.superior(id, reset);
        if (reset) {
            wx.showToast({
                title: result.message,
                duration: 2000
            });
            this.$children[2].close()
        }
        return false
    }

    static commandName () {
        return 'BIND_CONSUMER';
    }
}
