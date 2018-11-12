export default class MyStoreStatusPurchase {
	constructor(purchaseList) {
		console.log('MyStoreStatusPurchase transformer');
		switch (parseInt(purchaseList['type'])) {
			case 1:
				this.type = "进货订单";
				break;
			case 2:
				this.type = "退货订单";
				break;
			default:
				this.type = "出错";
				break;
		}
		switch (purchaseList['status']) {
			case 1:
				this.status = "待发货";
				break;
			case 2:
				this.status = "配送中";
				break;
			case 3:
				this.status = "已完成";
				break;
			case 4:
				this.status = "申请中";
				break;
			case 5:
				this.status = "退货中";
				break;
			case 6:
				this.status = "已拒绝";
				break;
			default:
				this.status = "出错";
				break;
		}
		this.code = purchaseList['code'];
		this.paid_at = purchaseList['paid_at'];
		this.payment_amount = purchaseList['payment_amount'];
	}
}
