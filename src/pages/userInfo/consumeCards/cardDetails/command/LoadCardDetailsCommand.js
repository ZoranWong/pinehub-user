import Command from '@/commands/Command';
export default class LoadCardDetailsCommand extends Command {
    async handle (id, page = 1) {
        if (page === 1) {
            this.model.account.dispatch('clearCardDetails')
        }
        let response = await this.service('http.account').cardDetails(id);
        this.model.account.dispatch('saveCardDetails', {
            list: response.data
        });
        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_CARD_DETAILS', id, page + 1)
        }
    }

    static commandName () {
        return 'LOAD_CARD_DETAILS';
    }
}
