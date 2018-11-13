import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
export default class ShoppingCarts extends Model {
	constructor(application) {
		super(application);
		this.id = Math.random() * 1000000000;
		this.transformer = ShoppingCartTransformer;
	} // 购物车内的相关数据计算 
	computed() {
		return _.extend(super.computed(), {
			totalAmount(state) {
				//  计算总价
				let total = 0;
				console.log('产品列表', state.list);
				this.list().forEach((item) => {
					console.log('价格X数量', item.sellPrice, item.count);
					total += item.sellPrice * item.count;
				});
				return total;
			},
			list(state) {
				console.log('调用 shopping_cart list', _.flatten(state.list));
				//console.log('shopping cart', state.list, this.id, this.$application.name);
				return _.flatten(state.list);
			},
			quality(state) {
				return(id) => {
					console.log('获取购物车，增加减少的数量', id, state.list);
					let cart = _.findWhere(this.list(), {
						merchandiseId: id
					});
					console.log('打开页面遍历购物车', cart)
					return cart ? cart.count : 0;
				}
			},
			totalCount(state) {
				let total = 0;
				console.log('产品列表>>>>>>>>>>>>>>', state.list, this.list());
				this.list().forEach((item) => {
					total += item.count;
				})
				console.log('购物车总数量>>>>>>>>>>>>>>>>>>>>>', total);
				return total;
			}
		});
	}

	data() {

		let data = _.extend(super.data(), {
			activityId: null,
			shopId: null
		});
		this.rebuildData();
		console.log(1111111111);
		return data;
	}

	async rebuildData() {
		let data = await this.getCache();
		//		console.log(22222222222222, data);
		_.extend(this.state, data);
	}
	async cache() {
		//console.log(this.state);
		return await this.services('mp.storage').set('shoppingCarts', this.state);
	}

	async getCache() {
		return await this.services('mp.storage').get('shoppingCarts');
		//return {};
	}
	listeners() {
		super.listeners();
		//设置列表
		this.addEventListener('setList', (payload, state /*paylaod*/ ) => {
			console.log('进入购物车 setList 监听');
			this.setList(payload, state);
			this.cache();
		});
		this.addEventListener('changeCart', function(cart) {
			let idx = this.state.currentPage > 0 ? (this.state.currentPage - 1) : 0;
			if(this.state.currentPage === 0) {
				this.state.currentPage = 1;
			}
			console.log('监听-changeCart', this.state);
			let tcart = _.findWhere(this.state.list[idx], {
				merchandiseId: cart.merchandiseId
			});

			if(!tcart) {
				console.log('-----------------!tcart', this.state.list)
				if(!this.state.list[idx]) {
					this.$application.$vm.set(this.state.list, idx, []);
				}
				this.state.list[idx].push(cart);
			} else {
				let index = this.state.list[idx].indexOf(tcart);
				if(cart.count === 0) {

					this.state.list[idx].splice(index, 1);
				} else {
					tcart.count = cart.count;
					this.$application.$vm.set(this.state.list[idx], index, tcart);
					//tcart.count = cart.count;
				}
				console.log('-----------------tcart', this.state.list)
			}
			this.cache();
		});

		//清空购物车
		this.addEventListener('reset', function({
			activity = false,
			shop = false
		}) {
			this.state.list = [];
			if(activity) {
				this.state.activityId = null;
			}

			if(shop) {
				this.state.shopId = null;
			}

			this.state.pageCount = 0;
			this.state.currentPage = 0;
			this.state.totalNum = 0;
			this.state.totalPage = 0;
			this.cache()
		});
	}
}