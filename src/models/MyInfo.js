import Model from './Model';
import _ from 'underscore';
import UserInfoTransformer from './transformers/UserInfo';
export default class MyInfo extends Model {
	constructor(app) {
		super(app);
		this.transformer = UserInfoTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			userInfo(state) {
				return state.userInfo;
			},
			hasStore(state) {
				return state.hasStore;
			}
		});
	}
	data() {
		return {
			userInfo: [],
			hasStore: true
		};
	}
	// 监听数据
	listeners() {
		this.addEventListener('userInfo', function({
			userInfo,
			hasStore
		}) {
			this.state.userInfo = this.transform(userInfo, this.transformer);
			this.state.hasStore = hasStore;
		});
	}
}