import Model from './Model';
import _ from 'underscore';
import MyStoreStatusPurchaseTs from './transformers/MyStoreStatusPurchase';
export default class MyStoreStatusPurchase extends Model {
	constructor(app) {
		super(app);
		this.transformer = MyStoreStatusPurchaseTs;
	}
	computed() {
		return _.extend(super.computed(), {
			purchaseList(state) {
				
				
				console.log('daying--------->',state.purchaseList);
				return state.purchaseList;
			},
			purchaseTotal(state) {
				return state.purchaseTotal;
			}
		});
	}
	data() {
		return {
			purchaseInfo: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('purchaseInfo', function({
			list,
			totalNum,
			currentPage,
			totalPage,
			pageCount
		}) {
			this.state.purchaseList = this.transform(list, this.transformer);
			this.state.purchaseTotal = totalNum;
		});
	}
}