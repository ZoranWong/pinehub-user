import Command from '@/commands/Command';

export default class BindConsumerCommand extends Command {
    async handle (id) {
        let result = await this.http.account.superior(id);
        console.log(result, '^^^^^^^^^^^^^^^^^^');
    }
    
    static commandName () {
        return 'BIND_CONSUMER';
    }
}
