import Command from '@/commands/Command';

export default class LoadStoresAroundCommand extends Command {
    async handle (lng, lat) {
        let [listData, totalNum, currentPage, totalPage, pageCount] = await this.service('http.store')
        .nearbyPoints(lng, lat);
        this.store().dispatch({
            type: 'model.stores/setList',
            list: listData,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: pageCount
        });
    }

    static commandName () {
        return 'LOAD_STORES_AROUND';
    }
}
