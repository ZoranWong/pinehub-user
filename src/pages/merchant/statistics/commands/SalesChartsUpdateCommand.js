import Command from '@/commands/Command';

export default class SalesChartsUpdateCommand extends Command {
    async handle (dateType) {
        let salesInfo = await this.service('http.store').salesInfo(dateType);
        this.$store.dispatch({
            type: 'model.salesInfo/setData',
            salesInfo: salesInfo,
            dateType: dateType
        });
    }

    static commandName () {
        return 'SALES_CHARTS_UPDATE';
    }
}
