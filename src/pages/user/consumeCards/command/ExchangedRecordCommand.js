import Command from '@/commands/Command';
export default class ExchangeRecordCommand extends Command {
    async handle (page = 1) {
        if (page === 1) {
            this.model.account.dispatch('clearExchangedRecords')
        }
        let response = await this.service('http.account').exchangeRecords();
        this.model.account.dispatch('saveExchangedRecords', {
            list: response.data
        })
        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_EXCHANGE_RECORDS', page + 1)
        }
    }

    static commandName () {
        return 'LOAD_EXCHANGE_RECORDS';
    }
}
