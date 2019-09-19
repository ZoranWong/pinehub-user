export default class MyStoreMerchanidise {
    constructor (merchandise) {
        this.index = merchandise['index'];
        this.id = merchandise['id'];
        this.name = merchandise['name'];
        this.sellPrice = merchandise['sell_price'];
        this.stockNum = merchandise['stock_num'];
        this.code = merchandise['code'];
    }
}
