import Command from './Command';
export default class GetNearestStoreCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle() {
		let [id, name, address] = [];
		try {
			let result = await this.service('map').getLocation();
			let store = await this.service('http.nearestStore').nearestStore(result.lng, result.lat);
			console.log('最近店铺信息', [id, name, address]);
			this.$store.dispatch('model.nearestStore/setStore', store);
		} catch(e) {
			console.log('居然来到了异常')
			console.log('抛出异常', e);
			throw(e);
			return false;
		}

	}
	static commandName() {
		return 'GET_NEAREST_STORE';
	}
}