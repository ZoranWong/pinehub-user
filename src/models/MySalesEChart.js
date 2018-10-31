import Model from './Model';
import _ from 'underscore';
export default class MySalesEChart extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			chartData(state) {
				console.log('CCCCCCCAAAAAA', this.state.chartDatas);
				return this.state.chartDatas;
			}
		});
	}
	data() {
		return {
			chartDatas: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('chartDatas', function({
			chartDatas
		}) {
			console.log('监听活动的', chartDatas);
			this.state.chartDatas = chartDatas;
			console.log('活动监听结束', this.state.chartDatas);
		});
	}
}
