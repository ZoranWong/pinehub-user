import Model from './Model';
import _ from 'underscore';

export default class Orders extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            orderInfo () {
                return this.state.orderInfo
            },
            createdOrderInfo () {
                return this.state.createdOrderInfo
            },
            couponIds () {
                return this.state.ids
            },
            shopInfo () {
                return this.state.shopInfo
            },
            addresses () {
                return this.state.addresses
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            orderInfo: {},
            createdOrderInfo: {},
            ids: [],
            shopInfo: {},
            addresses: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('saveOrderInfo', function ({orderInfo}) {
            _.map(orderInfo['order_items'], (item) => {
                let spec = [];
                for (let key in item['spec_value']) {
                    spec.push(item['spec_value'][key])
                }
                item['spec_desp'] = spec.join(',')
            });
            this.state.orderInfo = orderInfo;
        });

        this.addEventListener('saveCreatedOrderInfo', function ({orderInfo}) {
            this.state.createdOrderInfo = orderInfo
        });

        this.addEventListener('handleIds', function ({id}) {
            console.log(id, '准备处理couponid');
            let ids = this.state.ids;
            let index = _.indexOf(ids, id);
            if (index < 0) {
                ids.push(id)
            } else {
                ids.splice(index, 1)
            }
            this.state.ids = ids;
        });

        this.addEventListener('deleteId', function () {
            let ids = this.state.ids;
            ids.pop();
            this.state.ids = ids;
        });

        this.addEventListener('clearIds', function () {
            this.state.ids = [];
        });

        this.addEventListener('saveShopInfo', function ({info}) {
            this.state.shopInfo = info;
        })

        this.addEventListener('saveMallAddress', function ({address}) {
            console.log(address, '++++++++++++++++++++++++++');
            this.state.addresses = address;
        })
    }
}
