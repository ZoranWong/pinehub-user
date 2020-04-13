import Command from '../../../../../commands/Command';
import _ from 'underscore'
export default class LoadUserAddress extends Command {
    async handle (type) {
        let response = await this.service('http.address').addresses();
        let addresses = response.data;
        let defaultAdd = {};
        let selectedAddress = type === 'mall' ? this.model.user.order.payment.addresses : this.model.activity.address;
        if (_.isEmpty(selectedAddress)) {
            _.map(addresses, (address) => {
                if (address['is_default']) {
                    defaultAdd = address;
                }
            });
            if (type === 'mall') {
                console.log('这是商城');
                this.model.user.order.payment.dispatch('saveMallAddress', {
                    address: defaultAdd
                });
            } else {
                this.model.activity.dispatch('saveAddress', {
                    address: defaultAdd
                });
            }
        } else {
            _.map(addresses, (address) => {
                if (address['consignee_name'] === selectedAddress['consignee_name']) {
                    console.log('两者相等');
                    if (type === 'mall') {
                        this.model.user.order.payment.dispatch('saveMallAddress', {
                            address: address
                        });
                    } else {
                        this.model.activity.dispatch('saveAddress', {
                            address: address
                        });
                    }
                }
            })
        }
        this.model.user.address.dispatch('loadUserAddress', {
            addresses: addresses
        })
    }
    static commandName () {
        return 'LOAD_DEFAULT_USER_ADDRESS';
    }
}
