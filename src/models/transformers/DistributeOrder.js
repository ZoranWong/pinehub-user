export default class DistributeOrder {
    constructor (distributeOrders) {
        this.code = distributeOrders['code'];
        this.id = distributeOrders['id'];
        switch (parseInt(distributeOrders['status'])) {
            case 0:
                this.status = '已取消';
                break;
            case 100:
                this.status = '待支付';
                break;
            case 200:
                this.status = '支付中';
                break;
            case 300:
                this.status = '已支付';
                break;
            case 400:
                this.status = '已发货';
                break;
            case 500:
                this.status = '已完成';
                break;
            case 600:
                this.status = '支付失败';
                break;
            default:
                this.status = '';
                break;
        }
        this.buildNum = distributeOrders['build_num'];
        this.roomNum = distributeOrders['room_num'];
        this.receiverAddress = distributeOrders['receiver_address'];
        this.paymentAmount = distributeOrders['payment_amount'];
        this.totalAmount = distributeOrders['total_amount'].toFixed(2);
        this.reveiverMobile = distributeOrders['receiver_mobile'];
        this.createdAt = distributeOrders['created_at'];
        this.orderItems = distributeOrders['order_item_merchandises'];
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
