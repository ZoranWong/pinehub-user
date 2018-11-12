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
			purchaseList,
			purchaseTotal
		}) {
			this.state.purchaseList = this.transform(purchaseList, this.transformer);
			this.state.purchaseTotal = purchaseTotal;	
		});
	}
}
