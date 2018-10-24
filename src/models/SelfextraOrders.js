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
				return state.extraOrders;
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
			extraOrders: [],
			uncompletedOrders: [],
			completedOrders: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('extraOrders', function({list, totalNum, currentPage, totalPage}, state) {
			let startIndex = (currentPage - 1) * pageCount + 1;
			console.log(currentPage, pageCount, this.transformer);
			state.extraOrders = this.transform(list, this.transformer, startIndex);
			state.totalNum = totalNum;
		});
	}
}