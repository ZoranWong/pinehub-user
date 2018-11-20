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
			list(state) {

				console.log('daying--------->', this.state);
				return this.state.list;
			},
			totalNum(state) {
				return state.totalNum;
			}
		});
	}
	data() {
		return _.extend(super.data(), {
			purchaseInfo: []
		});
	}
	//监听数据
	listeners() {
		this.addEventListener('setData', function({
			list,
			totalNum,
			currentPage,
			totalPage,
			pageCount
		}) {
			console.log('MODEL--->>>>', list,
				totalNum,
				currentPage,
				totalPage,
				pageCount)
			this.state.list = this.transform(list, this.transformer)
			this.state.totalNum = totalNum;
		});
	}
}