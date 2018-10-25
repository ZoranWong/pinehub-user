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
//				return state.allOrders;
				return state.allOrders.currentPage ? _.flatten(state.allOrders.list) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			allOrders(state) {
				return state.allOrders;
			}
		});
	}
	data() {
		return {
			allOrders: super.data(),
			uncompletedOrders: super.data(),
			completedOrders: super.data()
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('allOrders', function({list, totalNum, currentPage, totalPage, pageCount}, state) {
			let orders = state.allOrders;
			let startIndex = (currentPage - 1) * pageCount + 1;
			orders.currentPage = currentPage;
	        orders.list[currentPage - 1] =  this.transform(list, this.transformer, startIndex);
	        if(totalNum !== null)
	          orders.totalNum = totalNum;
	        if(totalPage !== null) {
	          orders.totalPage = totalPage;
	          if(pageCount !== null) {
	            orders.pageCount = pageCount;
	          }
	        }
		});
	}
}