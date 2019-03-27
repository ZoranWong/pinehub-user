import Command from '@/commands/Command';

export default class LoadMerchantStoreMerchandisesCommand extends Command {
    async handle (storeId, currentCategoryIndex, categoryId, page = 1, limit = 15) {
        try {
            let [list, totalNum, currentPage, totalPage] = await this.service('http.store').merchandises(storeId, categoryId, page, limit);
            this.$store.dispatch({
                type: 'model.merchant.store.merchandises/setList',
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: limit,
                currentCategoryIndex: currentCategoryIndex
            });

            this.$store.dispatch({
                type: 'model.merchant.store.merchandises/setCurrentCategory',
                categoryIndex: currentCategoryIndex
            });
        } catch (e) {
            console.log(e);
        }
    }

    static commandName () {
        return 'LOAD_MERCHANT_STORE_MERCHANDISES';
    }
}
