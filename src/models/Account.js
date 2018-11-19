import Model from './Model';
import _ from 'underscore';
export default class Account extends Model {
	constructor(app) {
		super(app);
		this.resetAccountFromCache();
	}
	async resetAccountFromCache() {
		let account = await this.services('mp.storage').get('account');
		if(account) {
			_.extend(this.state, account);
		}
	}
	computed() {
		return _.extend(super.computed(), {
			isAuth(state) {
				return state.openId !== null;
			},
			isMember(state) {
				return state.mobile !== null;
			},
			isShopManager(state) {
				return state.isShopManager;
			},
			userScore(state) {
				return state.canUseScore;
			},
			token(state) {
				return state.token;
			},
			userInfo(state) {
				return _.omit(state, 'shop');
			},
			shopInfo(state) {
				return state.shop;
			}
		});
	}
	data() {
		return {
			openId: null,
			unionId: null,
			avatar: null,
			mobile: null,
			token: null,
			balance: 0,
			canUseScore: 0,
			country: null,
			city: null,
			sex: null,
			province: null,
			totalScore: 0,
			isShopManager: false,
			shop: {
				id: null,
				name: null,
				balance: null
			},
			vipLevel: null,
			ticketNum: 0,
			nickname: null
		};
	}
	// 监听数据
	listeners() {
		this.addEventListener('resetFromCache', async function({
			initAccount
		}) {
			await this.resetAccountFromCache();
			await initAccount();
			console.log('reset from cache');
		});
		this.addEventListener('setAccount', function(userInfo) {
			if(typeof userInfo['open_id'] !== 'undefined') {
				this.state.openId = userInfo['open_id'];
			}
			if(typeof userInfo['union_id'] !== 'undefined') {
				this.state.unionId = userInfo['union_id'];
			}
			if(typeof userInfo['avatar'] !== 'undefined') {
				this.state.avatar = userInfo['avatar'];
			}
			if(typeof userInfo['mobile'] !== 'undefined') {
				this.state.mobile = userInfo['mobile'];
			}
			if(typeof userInfo['token'] !== 'undefined') {
				this.state.token = userInfo['token'];
			}
			if(typeof userInfo['balance'] !== 'undefined') {
				this.state.balance = userInfo['balance'];
			}
			if(typeof userInfo['can_use_score'] !== 'undefined') {
				this.state.canUseScore = userInfo['can_use_score'];
			}
			if(typeof userInfo['country'] !== 'undefined') {
				this.state.country = userInfo['country'];
			}
			if(typeof userInfo['city'] !== 'undefined') {
				this.state.city = userInfo['city'];
			}
			if(typeof userInfo['province'] !== 'undefined') {
				this.state.province = userInfo['province'];
			}
			if(typeof userInfo['sex'] !== 'undefined') {
				this.state.sex = userInfo['sex'];
			}
			if(typeof userInfo['total_score'] !== 'undefined') {
				this.state.totalScore = userInfo['total_score'];
			}
			if(typeof userInfo['shop_id'] !== 'undefined') {
				this.state.isShopManager = (true && userInfo['shop_id']);
				this.state.shop.id = userInfo['shop_id'];
			}

			if(typeof userInfo['vip_level'] !== 'undefined') {
				this.state.vipLevel = userInfo['vip_level'];
			}

			if(typeof userInfo['ticket_num'] !== 'undefined') {
				this.state.ticketNum = userInfo['ticket_num'];
			}

			if(typeof userInfo['nickname'] !== 'undefined') {
				this.state.nickname = userInfo['nickname'];
			}
			try {
				console.log(this.services('mp.storage').set('account', this.state));
			} catch(e) {
				console.log(e);
			}
		});
	}
}