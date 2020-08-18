import Command from '@/commands/Command';

export default class LoadStoreCategoriesCommand extends Command {
    async handle () {
        let response = await this.service('http.store').categories();
        this.model.user.store.dispatch('saveCategories', {
            categories: response
        });
    }
    
    static commandName () {
        return 'LOAD_STORE_CATEGORIES_COMMAND';
    }
}
