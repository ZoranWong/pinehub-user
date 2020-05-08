import Command from '@/commands/Command';

export default class ClickGrouponCommand extends Command {
    async handle (id) {
        await this.service('http.groupon').clickGroupon(id);
    }

    static commandName () {
        return 'CLICK_GROUPON';
    }
}
