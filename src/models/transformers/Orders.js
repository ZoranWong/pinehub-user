export default class Orders {
  constructor(orders) {
  	console.log('order transformer');
    this.code = orders['code'];
    this.id = orders['id'];
    this.type = orders['type'];
    this.merchandiesNum = orders['merchandies_num'];
    this.paymentAmount = orders['payment_amount'];
    this.totalAmount = orders['total_amount'].toFixed(2);
    switch(parseInt(orders['status'])) {
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
    this.reveiverAddress = orders['reveiver_address'];
    this.createdAt = orders['created_at'];
    this.orderItems =orders['order_item_merchandises'];
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
