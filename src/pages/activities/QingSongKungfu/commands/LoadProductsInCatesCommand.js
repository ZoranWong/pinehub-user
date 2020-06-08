import Command from '@/commands/Command';

export default class LoadProductsInCatesCommand extends Command {
    async handle (id, page, limit = 10, cateId) {
        if (page === 1) {
            this.model.activity.dispatch('clearProducts')
        }
        let response = await this.service('http.activities').activityProducts(id, page, limit, cateId);

        if (response.data) {
            this.model.activity.dispatch('saveProducts', {
                products: response.data
            })
        }

        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_PRODUCTS_IN_CATES_COMMAND', id, page + 1, 10, cateId)
        }
    }

    static commandName () {
        return 'LOAD_PRODUCTS_IN_CATES_COMMAND';
    }
}
