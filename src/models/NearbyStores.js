import Model from './Model';
import _ from 'underscore';
import NearbyStoreTransformer from '@/models/transformers/NearbyStore';
export default class NearbyStores extends Model {
	constructor(app) {
		super(app);
		this.transformer = NearbyStoreTransformer;
	}

	computed() {
		return _.extend(super.computed(), {
			markers() {
				let list = this.list();
				let markers = [];
				_.each(list , function(store) {
					markers.push({
						id: store.id,
						longitude: store.lng,
						latitude: store.lat,
						title: store.name
					});
				});
				return markers;
			}
		});
	}
}
