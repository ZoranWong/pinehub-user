import Model from './Model'
import _ from 'underscore';
import NearestStoreTransformer from './transformers/NearestStore';
export default class NearestStore extends Model {
	constructor(application) {
		super(application);
	}
	computed() {
		return _.extend(super.computed(), {
       	location(state){
        	console.log( this.state, '001没有数据');
        	return state.name;
      	}
      // currentCategoryIndex(state) {
      // 	return state.currentCategoryIndex;
      // }
     });
   	}
	data() {
		return {
			id: null,
			name:null,
			address:null
		};
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