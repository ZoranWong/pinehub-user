import Command from '../../../../commands/Command';
export default class LoadIntegralProductsCommand extends Command {
    async handle (id, integral) {
        console.log('tututututttttttttttttttttttttttttttttttttt');
        let responses = await this.service('http.integral').exchangeProducts(id);
        if (responses) {
            this.model.account.dispatch('changeIntegral', {
                integral: integral
            })
        }
    }
    static commandName () {
        return 'EXCHANGE_PRODUCTS';
    }
}
