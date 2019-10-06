import Command from '../../../../commands/Command';
export default class LoadIntegralProductsCommand extends Command {
    async handle (id) {
        console.log('tututututttttttttttttttttttttttttttttttttt');
        let responses = await this.service('http.integral').exchangeProducts(id);
        console.log(responses, '=-=====================');
    }
    static commandName () {
        return 'EXCHANGE_PRODUCTS';
    }
}
