import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
export default class ShoppingCarts extends Model {
    constructor (application) {
        super(application);
        this.id = Math.random() * 1000000000;
        this.transformer = ShoppingCartTransformer;
    }
    // 购物车内的相关数据计算
    computed () {
        return _.extend(super.computed(), {
            totalAmount (state) {
                //  计算总价
                let total = 0;
                this.list().forEach((item) => {
                    total += item.sellPrice * item.count;
                });
                return total;
            },
            list (state) {
                return _.flatten(state.list);
            },
            quality () {
                return (id) => {
                    let cart = _.findWhere(this.list(), {
                        merchandiseId: id
                    });
                    return cart ? cart.count : 0;
                }
            },
            totalCount () {
                let total = 0;
                this.list().forEach((item) => {
                    total += item.count;
                })
                return total;
            }
        });
    }

    data () {
        let data = _.extend(super.data(), {
            activityId: null,
            shopId: null
        });
        this.rebuildData();
        return data;
    }

    async rebuildData () {
        let data = await this.getCache();
        _.extend(this.state, data);
    }
    async cache () {
        return await this.services('mp.storage').set('shoppingCarts', this.state);
    }

    async getCache () {
        return await this.services('mp.storage').get('shoppingCarts');
    }
    listeners () {
        super.listeners();
        // 设置列表
        this.addEventListener('setList', (payload, state /* paylaod */) => {
            this.setList(payload, state);
            this.cache();
        });
        this.addEventListener('changeCart', function (cart) {
            let idx = this.state.currentPage > 0 ? (this.state.currentPage - 1) : 0;
            if (this.state.currentPage === 0) {
                this.state.currentPage = 1;
            }
            let tcart = _.findWhere(this.state.list[idx], {
                merchandiseId: cart.merchandiseId
            });

            if (!tcart) {
                if (!this.state.list[idx]) {
                   this.$application.$vm.set(this.state.list, idx, []);
                }
                this.state.list[idx].push(cart);
            } else {
                let index = this.state.list[idx].indexOf(tcart);
                if (cart.count === 0) {
                    this.state.list[idx].splice(index, 1);
                } else {
                    tcart.count = cart.count;
                    this.$application.$vm.set(this.state.list[idx], index, tcart);
                }
            }
            this.cache();
        });

        // 清空购物车
        this.addEventListener('reset', function ({
          activity = false,
          shop = false
        }) {
            this.state.list = [];
            if (activity) {
                this.state.activityId = null;
            }

            if (shop) {
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
