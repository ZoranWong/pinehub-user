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
				return state.gathOrders;
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
			gathOrders: [],
			uncompletedOrders: [],
			completedOrders: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('gathOrders', function({list, totalNum, currentPage, totalPage,pageCount}) {
			let startIndex = (currentPage - 1) * pageCount + 1;
			//console.log('addListener');
			this.state.gathOrders = this.transform(list, this.transformer, startIndex);
			this.state.totalNum = totalNum;
			//console.log('statestatestatestatestate',this);
		});
	}
}