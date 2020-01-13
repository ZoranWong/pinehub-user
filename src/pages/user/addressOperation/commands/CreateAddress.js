import Command from '../../../../commands/Command';
export default class LoadIntegralProductsCommand extends Command {
    async handle (params) {
        console.log(params, '+++++++++++++++++""""""""""""""""""');
        let responses = await this.service('http.address').createAddress(params);
        console.log(responses, '|||||||||||||||||||||');
        if (responses) {

        }
    }
    static commandName () {
        return 'CREATE_ADDRESS';
    }
}
