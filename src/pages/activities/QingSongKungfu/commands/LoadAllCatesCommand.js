import Command from '@/commands/Command';

export default class LoadAllCatesCommand extends Command {
    async handle (id) {
        let response = await this.service('http.activities').categories(id);
        this.model.activity.dispatch('saveCategories', {
            categories: response
        });
    }

    static commandName () {
        return 'LOAD_ALL_CATES_COMMAND';
    }
}
