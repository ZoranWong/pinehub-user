import Command from '@/commands/Command';

export default class LoadGrouponCateProducts extends Command {
    async handle (shoppingGroupId, categoryId) {
        console.log(shoppingGroupId, '==========<');
        console.log(categoryId);
        let response = await this.service('http.groupon').getGrouponCateProducts(shoppingGroupId, categoryId);
        this.model.groupon.dispatch('saveCateProducts', {
            products: response
        });
    }

    static commandName () {
        return 'LOAD_GROUPON_CATE_PRODUCTS';
    }
}
