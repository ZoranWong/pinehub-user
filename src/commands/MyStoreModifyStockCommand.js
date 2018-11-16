import Command from './Command';
export default class MyStoreModifyStockCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(id, primaryStockNum, modifyStockNum, reason, comment = '') {
		try {
			let [response] = await this.service('http.myStoreModifyStock').modifyStock(id, primaryStockNum, modifyStockNum,
				reason, comment);
			console.log('库存修改之后的返回', response);

			this.$store.dispatch('model.my.store.category.merchandises/updateMerchandiseStock', {
				'id': response['id'],
				'stockNum': response['stock_num']
			});

			if(response) {
				wx.hideLoading()
				wx.showToast({
					title: "修改成功",
					icon: "none"
				})
			}
		} catch(e) {
			console.log(e);
		}

	}
	static commandName() {
		return 'MYSTOREMODIFYSTOCK';
	}
}