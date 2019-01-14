import Command from '@/commands/ShoppingCartCommand';
export default class BookingMallShoppingCartChangeMerchandiseCommand extends Command {
    constructor (app) {
        super(app);
        this.model = 'model.bookingMall.shoppingCarts';
    }
    async handle (merchandiseId, id = null, quality = 1) {
        try {
            let merchandise = null;
            if (id && quality === 0) {
                merchandise = await this.service('http.shoppingCart').deleteShoppingCart(id);
                if (merchandise) {
                    this.deleteShoppingCart(id);
                }
            } else if (id === null) {
                merchandise = await this.service('http.shoppingCart').bookingShoppingCartAddMerchandise(
                    merchandiseId,
                    quality);
                    if (merchandise) {
                        this.addMerchandiseToShoppingCart(merchandise);
                    }
                } else if (id && quality > 0) {
                    merchandise = await this.service('http.shoppingCart').bookingShoppingCartChangeMerchandise(
                        id,
                        merchandiseId,
                        quality);
                        if (merchandise) {
                            this.changeShoppingCartMerchandise(merchandise);
                        }
                    }
                } catch (e) {
                    console.log('抛出异常', e);
                }
            }

            static commandName () {
                return 'BOOKING_MALL_SHOPPINGCART_CHANGE_MERCHANDISE';
            }
        }
