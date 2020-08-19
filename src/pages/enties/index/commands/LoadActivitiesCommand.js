import Command from '@/commands/Command';

export default class LoadActivitiesCommand extends Command {
    async handle () {
        try {
            let result = await this.service('http.activities').activities();
            if (result) {
                this.model.activity.dispatch('saveActivities', {
                    activities: result
                })
            }
        } catch (e) {
            throw e;
        }
    }

    static commandName () {
        return 'ACTIVITIES';
    }
}
