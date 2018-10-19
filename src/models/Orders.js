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
			list(state) {
				return state.allOrders;
				//return state.currentPage ? _.flatten(state.list[state.currentCategoryIndex]) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			currentCategoryIndex(state) {
				//return state.currentCategoryIndex;
			},
			x() {
				return this.state.x;
			}
		});
	}
	data() {
		return {
			allOrders: [],
			uncompletedOrders: [],
			completedOrders: [],
			x: null
		};
	}
	listeners() {
		this.addEventListener('allOrders', function({list, totalNum,currentPage,totalPage,pageCount}, state) {
			state.allOrders = list;
			console.log('my orders total num', totalNum);
		});
	}
}