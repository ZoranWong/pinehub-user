export default class SelfextraOrders {
  constructor(selfextraOrders) {
  	console.log('order transformer');
    this.code = selfextraOrders['code'];
    this.id = selfextraOrders['id'];
    this.status = selfextraOrders['status'];
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
