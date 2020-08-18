import Command from '@/commands/Command';
export default class LoadTicketsCommand extends Command {
    async handle () {
        try {
            let [list, totalNum, currentPage, totalPage, pageCount] = await this.service('http.tickets').loadtickets();
            this.$store.dispatch('model.cards/setList', {
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: pageCount
            });
        } catch (e) {
            console.log('抛出异常', e);
            throw e;
        }
    }

    static commandName () {
        return 'LOAD_TICKETS'
    }
}
