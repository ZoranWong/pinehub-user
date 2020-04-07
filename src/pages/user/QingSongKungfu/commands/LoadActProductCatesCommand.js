import Command from '@/commands/Command';

export default class LoadActProductCatesCommand extends Command {
    async handle (id) {
        let response = await this.service('http.activities').activityCates(id);



        if (response.data) {
            this.model.activity.dispatch('saveActCates', {
                cates: response.data
            })
        }
    }

    static commandName () {
        return 'LOAD_ACT_PRODUCT_CATES_COMMAND';
    }
}
