import Model from './Model';
import _ from 'underscore';
import SelfextraTransformer from './transformers/SelfextraOrders';
export default class SelfextraOrders extends Model {
	constructor(app) {
		super(app);
		this.transformer = SelfextraTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			lists(state) {
//				return state.extraOrders;
				return state.extraOrders.currentPage ? _.flatten(state.extraOrders.list) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			extraOrders(state) {
				return state.extraOrders;
			}
		});
	}
	data() {
		return {
			extraOrders: super.data(),
			uncompletedOrders: super.data(),
			completedOrders: super.data()
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('extraOrders', function({list, totalNum, currentPage, totalPage, pageCount}, state) {
			let orders = state.extraOrders;
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