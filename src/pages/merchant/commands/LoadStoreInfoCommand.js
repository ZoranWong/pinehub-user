import Command from '@/commands/Command';
export default class LoadStoreInfoCommand extends Command {
    async handle (shopId, date = 'week') {
        try {
            let [storeInfo, sellAmountCharts, buyNumCharts] = await this.service('http.store').storeInfo(shopId);
            storeInfo = {
                storeInfo: storeInfo,
                sellAmountECharts: sellAmountCharts,
                buyNumECharts: buyNumCharts
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
