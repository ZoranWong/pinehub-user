export default class Orders {
  constructor(orders) {
    this.code = orders['code'];
    this.id = orders['id'];
    this.type = merchandise['type'];
    this.merchandiesNum = merchandise['merchandies_num'];
    this.paymentAmount = merchandise['payment_amount'];
    this.totalAmount = merchandise['total_amount'];
    this.status = merchandise['status'];
    this.reveiverAddress = merchandise['reveiver_address'];
    this.createdAt = merchandise['created_at'];
    this.orderItems = merchandise['order_item_merchandises'];
    for(var i in this.orderItems){
    	this.orderItems[i] = {
    		name: this.orderItems[i]['name'],
    		sellPrice: this.orderItems[i]['sell_price'],
    		quality: this.orderItems[i]['quality'],
    		totalAmount: this.orderItems[i]['total_amount']
    	}
    }
   
  }
 
}
