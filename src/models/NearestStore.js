import Model from './Model'
import _ from 'underscore';
import NearestStoreTransformer from './transformers/NearestStore';
export default class NearestStore extends Model {
	constructor(application) {
		super(application);
	}// 获取当日下单里的最近店铺
	computed() {
		return _.extend(super.computed(), {
       	location(state){
        	return state.location;
      	}
     });
   	}
	data() {
		return {
			location : {
				id: null,
				name:null,
				address:null
			}
			
		};
	}

	listeners() {
		super.listeners();
		this.addEventListener('location',function ({id,  name, address}, state ){
			this.state.location.name = name;
			this.state.location.id = id;
			this.state.location.address = address;
			
		});
		
	  
	}
}