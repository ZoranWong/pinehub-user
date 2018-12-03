import Command from './Command';
export default class GetNearestStoreCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(storeId) {
		try {
			let store = null;
			if(typeof storeId === 'undefined' || storeId === null) {
				wx.showLoading({ title: '定位中······' });
				let [lng, lat] = await this.map.getLocation();
				store = await this.http.store.nearestStore(lng, lat);
				wx.hideLoading();
			}else{
				store = this.$store.getters['model.stores/store'](storeId);
			}

			if(store) {
				this.$store.dispatch('model.nearestStore/setStore', store);
			}else{
				throw new Error('定位错误');
			}

		} catch(e) {
			console.log('定位错误', e);
			wx.hideLoading();
			await this.service('popup').toast('定位失败', 'warn', 2000);
			throw(e);
		}

	}
	static commandName() {
		return 'GET_NEAREST_STORE';
	}
}
