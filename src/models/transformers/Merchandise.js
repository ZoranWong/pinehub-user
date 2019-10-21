import _ from 'underscore';

export default class Merchandise {
    constructor (merchandise) {
        for (let k in merchandise) {
            this[k] = merchandise[k]
        }
        this.id = merchandise['id'];
        this.thumbImage = typeof merchandise['main_image'] !== 'undefined' ? merchandise['main_image'] : null;
        this.stockNum = merchandise.stock;
        this.sellNum = merchandise['sell_num'];
    }
}
