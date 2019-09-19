export default class SelfextraOrders {
  constructor(selfextraOrders) {
    this.code = selfextraOrders['code'];
    this.id = selfextraOrders['id'];
    switch(parseInt(selfextraOrders['status'])) {
				case 0:
					this.status = "已取消";
					break;
				case 100:
					this.status = "待支付";
					break;
				case 200:
					this.status = "支付中";
					break;
				case 300:
					this.status = "已支付";
					break;
				case 400:
					this.status = "已发货";
					break;
				case 500:
					this.status = "已完成";
					break;
				case 600:
					this.status = "支付失败";
					break;
				default:
					this.status = "";
					break;
		}
    this.receiverName = selfextraOrders['receiver_name'];
    this.receiverAddress = selfextraOrders['receiver_address'];
    this.receiverMobile = selfextraOrders['receiver_mobile'];
    this.paymentAmount = selfextraOrders['payment_amount'];
    this.totalAmount = selfextraOrders['total_amount'].toFixed(2);
    this.reveiverMobile = selfextraOrders['reveiver_mobile'];
    this.createdAt = selfextraOrders['created_at'];
    this.shopEnd = selfextraOrders['shop_end_hour'];
    this.orderItems =selfextraOrders['order_item_merchandises'];
    for(var i in this.orderItems){
    	this.orderItems[i] = {
    		name: this.orderItems[i]['name'],
    		sellPrice: this.orderItems[i]['sell_price'].toFixed(2),
    		quality: this.orderItems[i]['quality'],
    		totalAmount: this.orderItems[i]['total_amount'].toFixed(2)
    	}
    }

  }

}
