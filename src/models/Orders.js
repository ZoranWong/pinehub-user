import Model from './Model';
import _ from 'underscore';
import OrdersTransformer from './transformers/Orders';
export default class Orders extends Model {
	constructor(app) {
		super(app);
		this.transformer = OrdersTransformer;
	}
	computed() {
	    return _.extend(super.computed(), {
	      list(state){
			return state;
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
