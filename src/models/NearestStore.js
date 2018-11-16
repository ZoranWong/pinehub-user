import Model from './Model'
import _ from 'underscore';
import NearestStoreTransformer from './transformers/NearestStore';
export default class NearestStore extends Model {
	constructor(application) {
		super(application);
	} // 获取当日下单里的最近店铺
	computed() {
		return _.extend(super.computed(), {
			location(state) {
				return state.location;
			}
		});
	}
	data() {
		return {
			location: {
				id: null,
				name: null,
				address: null
			}

		};
	}
	async cache() {
		//console.log(this.state);
		return await this.services('mp.storage').set('location', this.state);
	}

	async getCache() {
		return await this.services('mp.storage').get('location');
		//return {};
	}

	listeners() {
		super.listeners();
		this.addEventListener('location', function({
			id,
			name,
			address
		}, state) {
			state.location.name = name;
			state.location.id = id;
			state.location.address = address;

		});
		this.cache();
		// console.log(this.cache(),"你当时")

		//获取当日下单的配送的地址
		//  this.addEventListener('getAddress', async  function({shopId}) {    
		//   console.log('get from cache'); 
		//   let data = await this.getCache();
		//   console.log('cache data ', data); 
		//   data = data ? data : {};
		//   _.extend(this.state, data);
		//   this.state.shopId = shopId;
		// })
	}
}