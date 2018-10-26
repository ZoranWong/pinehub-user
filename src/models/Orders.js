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
				return state.orders[state.status] && state.orders[state.status].currentPage ? _.flatten(state.orders[state.status].list) : [];
			},
			totalNum(state){
				return state.orders[state.status] ? state.orders[state.status].totalNum : 0;
			},
			orders(state) {
				return state.orders[state.status];
			},
			currentPage(state) {
				return state.orders[state.status] ? state.orders[state.status].currentPage : 1 ;
			}
		});
	}
	data() {
		return {
			status: 'all',
			orders: {
				
			}
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('setOrders', function({list, totalNum, currentPage, totalPage, pageCount, status}, state) {
			let orders = state.orders[status] ? state.orders[status] : {
				list: [],
				pageCount: 0,
				currentPage: 0,
				totalNum: 0,
			};
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
//	        let statusOrders = {};
//	        statusOrders[status] = orders;
	        this.$application.$vm.set(state.orders, status, orders);
	        state.status = status;
	        console.log(state.orders, state.status);
		});
	}
}