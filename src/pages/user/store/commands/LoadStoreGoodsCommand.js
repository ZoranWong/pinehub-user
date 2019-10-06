import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (id, page = 1, limit = 15) {
        let response = await this.service('http.store').products(id, page, limit);
        
        // console.log('----- request -----', Date.now());
        this.model.user.store.dispatch('saveGoods', {
            goods: response
        });
        // console.log('----- set data -----', Date.now());
    }
    
    static commandName () {
        return 'LOAD_STORE_COMMAND';
    }
}
