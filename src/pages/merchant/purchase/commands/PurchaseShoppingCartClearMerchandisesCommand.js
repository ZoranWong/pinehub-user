import Command from '@/commands/ShoppingCartCommand';
export default class PurchaseShoppingCartClearMerchandisesCommand extends Command {
    constructor (app) {
        super(app);
        this.model = 'model.purchase.shoppingCarts';
    }
    async handle () {
        try {
            let result = await this.service('http.shoppingCart').purchaseShoppingCartClearMerchandises();
            if (result) {
                this.store().dispatch(this.model + '/reset', {
                    activity: true
                });
            }
        } catch (e) {
            console.log('抛出异常', e);
        }
    }

    static commandName () {
        return 'PURCHASE_SHOPPINGCART_CLEAR_MERCHANDISES';
    }
}
