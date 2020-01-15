import Command from '../../../../commands/Command';
export default class LoadIntegralRecordsCommand extends Command {
    async handle () {
        let response = await this.service('http.integral').exchangeRecords();
        this.model.integral.records.dispatch('saveIntegralRecords', {
            records: response
        })
    }
    static commandName () {
        return 'LOAD_INTEGRAL_RECORDS';
    }
}
