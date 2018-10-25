import Model from './Model';
import _ from 'underscore';
import DisordersTransformer from './transformers/DistributeOrder';
export default class DistributeOrder extends Model {
	constructor(app) {
		super(app);
		this.transformer = DisordersTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			lists(state) {
//				return state.extraOrders;
				return state.disOrders.currentPage ? _.flatten(state.disOrders.list) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			disOrders(state) {
				return state.disOrders;
			}
		});
	}
	data() {
		return {
			disOrders:super.data(),
			uncompletedOrders:super.data(),
			completedOrders:super.data()
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('disOrders', function({list, totalNum, currentPage, totalPage, pageCount}, state) {
			let orders = state.disOrders;
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