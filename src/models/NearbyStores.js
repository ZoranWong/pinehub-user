import Model from './Model';
import _ from 'underscore';
import NearbyStoreTransformer from '@/models/transformers/NearbyStore';
export default class NearbyStores extends Model {
	constructor(app) {
		super(app);
		this.transformer = NearbyStoreTransformer;
	}

	data() {
		return _.extend(super.data(), {
			selectMarkerId: null
		});
	}

	computed() {
		return _.extend(super.computed(), {
			markers() {
				let list = this.list();
				let markers = [];
				_.each(list, (store) => {
					if(this.state.selectMarkerId && this.state.selectMarkerId === store.id) {
						markers.push({
							iconPath: "/static/images/position.png",
							width: 52.5,
							height: 78.5,
							id: store.id,
							longitude: store.lng,
							latitude: store.lat,
							title: store.name,
							callout: {
								content: store.name + store.address,
								color: "#ff0000",
								fontSize: "16",
								borderRadius: "10",
								bgColor: "#ffffff",
								padding: "10",
								display: "ALWAYS" 
							}
						});
					} else {
						markers.push({
							iconPath: "/static/images/position.png",
							width: 35,
							height: 47,
							id: store.id,
							longitude: store.lng,
							latitude: store.lat,
							title: store.name,
						});
					}

				});
				return markers;
			}
		});
	}
	
	listeners() {
		super.listeners();
		this.addEventListener('selectMarker', function({id}) {
			this.state.selectMarkerId = id;
		});
	}
}