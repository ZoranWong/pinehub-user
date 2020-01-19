import Command from '@/commands/Command';

export default class LoadActProductsCommand extends Command {
    async handle (id, page = 1, limit = 15) {
        let response = await this.service('http.activities').activityProducts(id);

        if (response) {
            this.model.activity.dispatch('saveProducts', {
                products: response
            })
        }

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_ACT_PRODUCTS_COMMAND';
    }
}
