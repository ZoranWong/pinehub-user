import Command from '@/commands/Command';

export default class SelectAddressCommand extends Command {
    async handle (address) {
        this.model.activity.dispatch('saveAddress', {
            address
        });
        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'SELECT_ADDRESS_COMMAND';
    }
}
