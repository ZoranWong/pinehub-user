import Command from '../../../../../commands/Command';
import _ from 'underscore'
export default class LoadUserAddress extends Command {
    async handle () {
        let response = await this.service('http.address').addresses();
        let addresses = response.data;
        let defaultAdd = {};
        let selectedAddress = this.model.activity.address;
        if (_.isEmpty(selectedAddress)) {
            _.map(addresses, (address) => {
                if (address['is_default']) {
                    defaultAdd = address;
                }
            });
            this.model.activity.dispatch('saveAddress', {
                address: defaultAdd
            });
        } else {
            _.map(addresses, (address) => {
                if (address['consignee_name'] === selectedAddress['consignee_name']) {
                    console.log('两者相等');
                    this.model.activity.dispatch('saveAddress', {
                        address: address
                    });
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
