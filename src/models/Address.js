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
            _.map(addresses, (address) => {
                address.rangeAddress = address.pca.join(' ');
                let ary = [];
                ary.push(address['province']['region_code']);
                ary.push(address['city']['region_code']);
                ary.push(address['area']['region_code']);
                address.regionCode = ary;
                if (address.tag === 'school' || address.tag === 'company' || address.tag === 'home') {
                     address.isDefaultTag = true
                 } else {
                     address.isDefaultTag = false
                 }
            });
            this.state.addresses = addresses;
        })
    }
}
