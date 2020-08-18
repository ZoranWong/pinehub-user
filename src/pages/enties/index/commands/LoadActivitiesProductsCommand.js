import Command from '@/commands/Command';

export default class LoadActivitiesProductsCommand extends Command {
    async handle (ids) {
        try {
            let result = await this.service('http.activities').getProductsInfo(ids);
            if (result) {
                this.model.activity.dispatch('saveActivitiesProducts', {
                    products: result
                })
            }
        } catch (e) {
            throw e;
        }
    }

    static commandName () {
        return 'ACTIVITIES_PRODUCTS';
    }
}
