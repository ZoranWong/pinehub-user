import Command from '../../../../commands/Command';
import _ from 'underscore'
export default class LoadUserAddress extends Command {
    async handle () {
        let response = await this.service('http.address').addresses();
        let addresses = response.data;
        let defaultAdd = {};
        _.map(addresses, (address) => {
            if (address['is_default']) {
                defaultAdd = address;
            }
        });
        this.model.activity.dispatch('saveAddress', {
            address: defaultAdd
        });
        this.model.user.address.dispatch('loadUserAddress', {
            addresses: addresses
        })
    }
    static commandName () {
        return 'LOAD_USER_ADDRESS';
    }
}
