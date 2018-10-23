import Model from './Model';
import _ from 'underscore';
export default class MyStoreInfo extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			storeInfo(state) {
				return state.storeInfo;
			},
			sellAmountCharts(state) {
				return state.sellAmountCharts;
			},
			buyNumCharts(state) {
				return state.buyNumCharts;
			}
		});
	}
	data() {
		return {
			storeInfo: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('storeInfo', function({
			storeInfo,
			sellAmountCharts,
			buyNumCharts
		}) {
			this.state.storeInfo = storeInfo;
			this.state.sellAmountCharts = sellAmountCharts;
			this.state.buyNumCharts = buyNumCharts;
		});
	}
}
