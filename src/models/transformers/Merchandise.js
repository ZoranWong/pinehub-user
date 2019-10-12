import _ from 'underscore';

export default class Merchandise {
    constructor (merchandise) {
        console.log(merchandise, '44444444444444444444444444444');
        for (let k in merchandise) {
            this[k] = merchandise[k]
        }
        this.id = merchandise['id'];
        this.thumbImage = typeof merchandise['main_image'] !== 'undefined' ? merchandise['main_image'] : null;
        this.sellPrice = merchandise['sell_price'].toFixed(2);
        this.originPrice = typeof merchandise['origin_price'] !== 'undefined' ? merchandise['origin_price'].toFixed(2) : null;
        this.stockNum = merchandise['product_entities'][0].stock;
        this.sellNum = merchandise['sell_num'];
    }
}
