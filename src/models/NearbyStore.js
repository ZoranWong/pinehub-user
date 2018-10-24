import Model from './Model'
import _ from 'underscore';
import NearbyStoreTransformer from './transformers/NearbyStore';
export default class NearbyStore extends Model {
	constructor(application) {
		super(application);
	}  // 预定商城里获取附近的几个店铺
	computed() {
		return {

		};
	}
	data() {
		let data = super.data();
		return _.extend(data, {

		});
	}
	events() {
		let events = super.events();
		return _.extend(events, {

		});
	}

	listeners() {
		let listeners = super.listeners();
		return _.extend(listeners, {

		});
	}
}