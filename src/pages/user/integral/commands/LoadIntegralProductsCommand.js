import Command from '../../../../commands/Command';
export default class LoadIntegralProductsCommand extends Command {
    async handle (page, limit = 15) {
        let [list, totalNum, currentPage, totalPage] = await this.service('http.integral').integralProducts(page, limit);
        this.model.integral.dispatch('setList', {
            list: list,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
        })
    }
    static commandName () {
        return 'LOAD_INTEGRAL_MALL';
    }
}
