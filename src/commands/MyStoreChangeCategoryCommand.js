import Command from './Command';
export default class MyStoreChangeCategoryCommand extends Command {
    constructor (app) {
        super(app);
    }
    async handle (currentCategoryIndex, categoryId, page = 1, limit = 15) {
        console.log('MyStoreChangeCategoryCommand-------MyStoreChangeCategoryCommand');
        let storeId = 1;
        try {
            let [list, totalNum, currentPage, totalPage] = await this.service('http.myStoreCategoryMerchandises').list(storeId, categoryId, page, limit);
            this.store().dispatch({
                type: 'model.my.store.category.merchandises/setList',
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: limit,
                currentCategoryIndex: currentCategoryIndex
            });

            this.store().dispatch({
                type: 'model.my.store.category.merchandises/setCurrentCategory',
                categoryIndex: currentCategoryIndex
            });
        } catch (e) {
            console.log(e);
        }
    }
    static commandName () {
        return 'MYSTORECHANGECATEGORY';
    }
}
