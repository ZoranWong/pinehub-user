import Command from '@/commands/Command';

export default class CleraActive extends Command {
    async handle () {
        console.log( ' ---------- CleraActive 0 -----------------');
        try {
            this.model.account.dispatch('clearAcquisitionNotActive');
            console.log( ' ---------- CleraActive 1 -----------------');
        } catch (e) {
            throw e;
        }
    }

    static commandName () {
        return 'CLEAR_ACTIVE';
    }
}
