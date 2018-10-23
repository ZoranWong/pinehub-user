import Model from './Model';
import _ from 'underscore';
export default class MyInfo extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			userInfo(state) {
				return state.userInfo;
			},
			hasStore(state){
				return state.hasStore;
			}
		});
	}
	data() {
		return {
			userInfo: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('userInfo', function({userInfo,hasStore}) {
			this.state.userInfo = userInfo;
			this.state.hasStore = hasStore;
		});
	}
}