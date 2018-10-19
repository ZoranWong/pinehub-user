import Model from './Model';
import _ from 'underscore';
import MerchandiseTransformer from './transformers/Merchandise';
export default class Orders extends Model {
	constructor(app) {
		super(app);
		this.transformer = MerchandiseTransformer;
	}
	computed() {
	    return _.extend(super.computed(), {
	      list(state){
	        console.log('myorders', this,999999999); 
	        //return state.currentPage ? _.flatten(state.list[state.currentCategoryIndex]) : [];
	      },
	      currentCategoryIndex(state) {
	      	//return state.currentCategoryIndex;
	      }, 
	      consoleThis() {
	      	console.log('test', this);
	      	return 'test';
	      }
	    });
	}
	data() {
		return {
			allOrders: [],
			uncompletedOrders: [],
			completedOrders: []
		};
	}
}
