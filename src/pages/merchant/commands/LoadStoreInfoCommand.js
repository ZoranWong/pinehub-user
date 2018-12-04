import Command from '@/commands/Command';
export default class LoadStoreInfoCommand extends Command {
    async handle (shopId) {
        try {
            let [storeInfo, sellAmountCharts, buyNumCharts] = await this.service('http.store').storeInfo(shopId);
            let xDate = 'week';
            let sellAmountECharts = await this.service('mp.eCharts').createChart(xDate, sellAmountCharts, true);
            let buyNumECharts = await this.service('mp.eCharts').createChart(xDate, buyNumCharts, true);
            storeInfo = {
                storeInfo: storeInfo,
                sellAmountECharts: sellAmountECharts,
                buyNumECharts: buyNumECharts
            };
            this.store().dispatch('model.account/setStoreInfo', storeInfo);
        } catch (e) {
            console.log(e);
        }
    }
    static commandName () {
        return 'LOAD_STORE_INFO';
    }
}
