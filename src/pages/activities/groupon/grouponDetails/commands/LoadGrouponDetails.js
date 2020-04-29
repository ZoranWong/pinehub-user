import Command from '@/commands/Command';

export default class LoadGrouponDetails extends Command {
    async handle (id) {
        let response = await this.service('http.groupon').getGrouponDetails(id);
        this.model.groupon.dispatch('saveGrouponDetails', {
            details: response
        });
    }

    static commandName () {
        return 'LOAD_GROUPON_DETAILS';
    }
}
