import Model from './Model';
import _ from 'underscore';
import gathOrderTransformer from './transformers/GatherOrd';
export default class GatherOrder extends Model {
	constructor(app) {
		super(app);
		this.transformer = gathOrderTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			lists(state) {
//				return state.extraOrders;
				return state.orders.currentPage ? _.flatten(state.orders.list) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			gathOrders(state) {
				return state.orders;
			}
		});
	}
	data() {
		return {
			orders:super.data(),
			uncompletedOrders:super.data(),
			completedOrders:super.data()
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('gathOrders', function({list, totalNum, currentPage, totalPage, pageCount}, state) {
			console.log('gathOrders', currentPage);
			let orders = state.orders;
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