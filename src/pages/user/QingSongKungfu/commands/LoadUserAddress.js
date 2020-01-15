import Command from '../../../../commands/Command';
export default class LoadUserAddress extends Command {
    async handle () {
        let response = await this.service('http.address').addresses();
        this.model.user.address.dispatch('loadUserAddress', {
            addresses: response.data
        })
    }
    static commandName () {
        return 'LOAD_USER_ADDRESS';
    }
}
