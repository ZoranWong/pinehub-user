export default class DistributeOrder {
  constructor(distributeOrders) {
  	//console.log('order transformer');
    this.code = distributeOrders['code'];
    this.id = distributeOrders['id'];
    this.status = distributeOrders['status'];
    this.receiverAddress = distributeOrders['receiver_address'];
    this.paymentAmount = distributeOrders['payment_amount'];
    this.totalAmount = distributeOrders['total_amount'].toFixed(2);
    this.reveiverMobile = distributeOrders['reveiver_mobile'];
    this.createdAt = distributeOrders['created_at'];
    this.orderItems =distributeOrders['order_item_merchandises'];
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
