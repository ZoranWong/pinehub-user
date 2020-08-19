import Command from '@/commands/Command';
export default class LoadBalanceRecordCommand extends Command {
    async handle (page = 1) {
        let response = await this.service('http.auth').balanceRecord();
        this.model.account.dispatch('saveBalanceRecord', {
            list: response
        })
    }
    
    static commandName () {
        return 'LOAD_BALANCE_RECORD';
    }
}
