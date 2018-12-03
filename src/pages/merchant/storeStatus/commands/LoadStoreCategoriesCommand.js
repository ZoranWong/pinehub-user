import Command from '@/commands/Command';
export default class LoadStoreCategoriesCommand extends Command {
    async handle (storeId, page = 1, limit = 15) {
        let [list, totalNum, currentPage, totalPage] = await this.service('http.categories').storeCategories(storeId, page, limit);
        this.store().dispatch({
            type: 'model.categories/setList',
            list: list,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
        });
    }
    static commandName () {
        return 'LOAD_STORE_CATEGORIES';
    }
}
