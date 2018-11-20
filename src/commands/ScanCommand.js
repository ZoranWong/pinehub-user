import Command from './Command';
export default class ScanCommand extends Command {
	constructor(app) {
		super(app);
	}
	//
	async handle() {
		try {
			let scanResult = null;
			let codeNum = null;
			let scanType = null;
			scanResult = await this.service('scan').scanCode();
			console.log('scanResult', scanResult)

			//console.log('ok');
			let result = await this.service('json').decode(scanResult.result);
			console.log('result.action', result, result['action'])
			if(result.action == 'verification') {
				let orderId = result.orderId;
				console.log('ID', orderId);
				await this.$command('ORDER_STATUS_UPDATE', 'verification', orderId);
				this.mp.router.push('myOrder');
			}
		} catch(e) {
			console.log('抛出异常', e)
			throw(e);
			return false;
		}
		//		scanType = scanResult.scanType;
		//console.log(codeNum, scanType);
		//		let [code, status] = await this.service('scanCodeService')['scanCode'](codeNum);
		// order_code 是订单编码   status 订单状态：1-待发货 2-配送中 3-已完成 4-申请中 5-退货中 6-已拒绝
		// 		switch (status) {
		// 			case 3:
		// 				wx.showToast({
		// 					title: '入库成功',
		// 					icon: 'none',
		// 					duration: 2000
		// 				})
		// 				console.log('this', this);
		// 				setTimeout(function() {
		// 					this.$application.$command('router', 'myfeedbacksuccess', 'push');
		// 				}, 4000);
		// 				break;
		// 			default:
		// 				wx.showToast({
		// 					title: '入库失败',
		// 					icon: 'none',
		// 					duration: 2000
		// 				})
		// 				break;
		// 		}
		//		if (status == 3) {
		//			console.log('this', this);
		//			this.$application.$command('router', router, 'push');
		//			wx.showToast({
		//				title: '入库成功',
		//				icon: 'none',
		//				duration: 4000
		//			})
		//		} else {
		//			wx.showToast({
		//				title: '入库失败',
		//				icon: 'none',
		//				duration: 2000
		//			})
		//		}
	}
	static commandName() {
		return 'scanCommand';
	}
}