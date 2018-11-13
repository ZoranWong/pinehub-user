import Model from './Model';
import _ from 'underscore';
export default class Account extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			isAuth(state) {
				return state.openId !== null;
			},
			isMember(state) {
				return state.mobile !== null;
			},
			userScore(state) {
				return state.userScore;
			},
			token(state) {
				return state.token;
			}
		});
	}
	data() {
//		let userInfo = this.services();
		return {
			openId: null,
			unionId: null,
			avator: null,
			mobile: null,
			userScore: null,
			token: null
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('setAccount', function(userInfo) {
			_.extend(this.state, userInfo);
//			this.services('mp.storage').set('token', userInfo.token);
//			this.services('mp.storage').set('userInfo', userInfo);
		});
	}
}