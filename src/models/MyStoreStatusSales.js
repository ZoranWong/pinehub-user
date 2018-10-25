import Model from './Model';
import _ from 'underscore';
export default class MyStoreStatusSales extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			salesInfo(state) {
				return state.salesInfo;
			},
			sellTop(state) {
				return state.sellTop;
			},
			merchandiseTop(state) {
				return state.merchandiseTop;
			},
			statics(state) {
				return state.statics;
			}
		});
	}
	data() {
		return {
			salesInfo: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('salesInfo', function({
			salesInfo,
			sellTop,
			merchandiseTop,
			statics
		}) {
			this.state.salesInfo = salesInfo;
			this.state.sellTop = sellTop;
			this.state.merchandiseTop = merchandiseTop;
			this.state.statics = statics;
			console.log('sales---------B',this.state);
		});
	}
}
