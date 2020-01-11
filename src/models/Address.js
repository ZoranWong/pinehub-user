import Model from './Model';
import _ from 'underscore';

export default class Address extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            addresses () {
                return this.state.addresses
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            addresses: []
        };
    }

    // 监听数据
    listeners () {
        this.addEventListener('loadUserAddress', function ({addresses}) {
            this.state.addresses = addresses
        })
    }
}
