import Command from './Command';
export default class LoadChargeCardsCommand extends Command {
    async handle (amount) {
        try {
            console.log('------------', amount);
            let data = await this.http.chargeCard.rechargeableCards(amount);
            this.store().dispatch('model.account/setAccount', {balance: data[1]});
            this.store().dispatch('model.chargeCards/setList', {list: data[0]});
        } catch (e) {
            console.log(e);
        }
    }

    static commandName () {
        return 'LOAD_CHARGE_CARDS';
    }
}
