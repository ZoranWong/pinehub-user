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
			lists(state) {
				return state.order;
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
	//监听数据
	listeners() {
		this.addEventListener('allOrders', function({list, totalNum,currentPage,totalPage,pageCount}, state) {
			state.order = list;
			state.totalNum = totalNum;
			console.log('my orders total num', totalNum);
		});
	}
}