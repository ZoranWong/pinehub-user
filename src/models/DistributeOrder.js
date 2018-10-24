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
				return state.disOrders;
				//return state.currentPage ? _.flatten(state.list[state.currentCategoryIndex]) : [];
			},
			totalNum(state){
				return state.totalNum;
			},
			currentCategoryIndex(state) {
				//return state.currentCategoryIndex;
			}
		});
	}
	data() {
		return {
			disOrders: [],
			uncompletedOrders: [],
			completedOrders: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('disOrders', function({list, totalNum, currentPage, totalPage, pageCount}, state) {
			let startIndex = (currentPage - 1) * pageCount + 1;
			console.log(currentPage, pageCount, this.transformer);
			state.disOrders = this.transform(list, this.transformer, startIndex);
			state.totalNum = totalNum;
		});
	}
}