import Command from '@/commands/Command';
export default class MyConsumeCardsCommand extends Command {
    async handle (page = 1) {
        if (page === 1) {
            this.model.account.dispatch('clearMyConsumeCards')
        }
        let response = await this.service('http.account').consumerCards();
        this.model.account.dispatch('saveMyConsumeCards', {
            cards: response.data
        });
        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_MY_CONSUME_CARDS', page + 1)
        }
    }

    static commandName () {
        return 'LOAD_MY_CONSUME_CARDS';
    }
}
