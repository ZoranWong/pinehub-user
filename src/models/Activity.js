import Model from './Model';
import _ from 'underscore';

export default class Activity extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            id (state) {
                return state.id;
            },
            activities () {
                return this.state.activities
            },
            banners () {
                return this.state.banners
            },
            products () {
                return this.state.products
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            id: null,
            activities: [],
            banners: [],
            products: []
        };
    }

    // 监听数据
    listeners () {
        this.addEventListener('info', function (userInfo) {
            _.extend(this.state, userInfo);
            // this.service('mp.storage').set('token', userInfo.token);
            // this.service('mp.storage').set('userInfo', userInfo);
        });
        this.addEventListener('saveActivities', function ({activities}) {
            this.state.activities = activities;
        });
        this.addEventListener('saveActBanners', function ({banners}) {
            this.state.banners = banners;
        });
        this.addEventListener('saveProducts', function ({products}) {
            this.state.products = products;
        });
    }
}
