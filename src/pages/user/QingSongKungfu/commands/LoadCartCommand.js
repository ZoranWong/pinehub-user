import Command from '@/commands/Command';

export default class LoadCartCommand extends Command {
    async handle (type, id) {
        let response = await this.service('http.activities').cartGoodsList(id);
        this.model.activity.dispatch('saveActivityCartGoodsList', {
            products: response.data
        });

        console.log(response, 'saassaassaasa --------');

        // console.log('----- request -----', Date.now());

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_ACTIVITY_CART_COMMAND';
    }
}
