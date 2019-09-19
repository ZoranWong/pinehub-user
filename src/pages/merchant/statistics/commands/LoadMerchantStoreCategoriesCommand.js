import Command from '@/commands/Command';

export default class LoadMerchantStoreCategoriesCommand extends Command {
    async handle (storeId, page = 1, limit = 15) {
        let [list, totalNum, currentPage, totalPage] = await this.service('http.categories').storeCategories(storeId, page, limit);
        this.$store.dispatch({
            type: 'model.merchant.store.categories/setList',
            list: list,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
        });
    }

    static commandName () {
        return 'LOAD_MERCHANT_STORE_CATEGORIES';
    }
}
