import Command from '@/commands/Command';

export default class LoadTradeOrderItemsCommand extends Command {
    async handle (page = 1, limit = 15) {
        let [list, totalNum, currentPage, totalPage] = await this.service('http.account').orderRecords(page, limit);
        this.store().dispatch({
            type: 'model.tradeOrderItems/setList',
            list: list,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
        });
    }

    static commandName () {
        return 'LOAD_TRADE_ORDER_ITEMS';
    }
}
