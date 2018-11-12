import Command from './Command';
export default class MyStoreModifyStockCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(id, primaryStockNum, modifyStockNum, reason, comment = null) {
		let [response] = await this.service('http.myStoreModifyStock').modifyStock(id, primaryStockNum, modifyStockNum,
			reason, comment);
		if (response.data) {
			wx.hideLoading()
			wx.showToast({
				title: "修改成功",
				icon: "none"
			})
		}
	}
	static commandName() {
		return 'MYSTOREMODIFYSTOCK';
	}
}
