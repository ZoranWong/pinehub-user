import Command from './Command';
export default class GetNearestStoreCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle() {
		console.log('执行查询最近的店铺command');
		let position = await this.service('location').getLocation();
		try {
			let [id, name, address] = await service.store(position.lng, position.lat);
			let service = this.service('http.nearestStore');
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}

		// console.log(  position,'经纬度',position.lng, position.lat, address);
		this.store().dispatch('model.nearestStore/location', {
			id: id,
			name: name,
			address: address,

		});

	}
	static commandName() {
		return 'GET_NEAREST_STORE';
	}
}