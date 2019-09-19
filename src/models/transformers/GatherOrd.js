export default class GatherOrd {
    constructor (GatherOrds) {
        // console.log('order transformer');
        this.code = GatherOrds['code'];
        this.id = GatherOrds['id'];
        this.reveiverAddress = GatherOrds['reveiver_address'];
        this.merchandiesNum = GatherOrds['merchandies_num'];
        this.paymentAmount = GatherOrds['payment_amount'];
        this.totalAmount = GatherOrds['total_amount'].toFixed(2);
        this.cardId = GatherOrds['card_id'];
        this.reduceCost = GatherOrds['reduce_cost'];
        this.sellPoint = GatherOrds['sell_point'];
        this.orderItems = GatherOrds['order_item_merchandises'];
        for (var i in this.orderItems) {
            this.orderItems[i] = {
                name: this.orderItems[i]['name'],
                sellPrice: this.orderItems[i]['sell_price'].toFixed(2),
                quality: this.orderItems[i]['quality'],
                totalAmount: this.orderItems[i]['total_amount'].toFixed(2)
            }
        }
    }
}
