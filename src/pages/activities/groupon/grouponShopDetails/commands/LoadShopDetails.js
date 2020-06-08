import Command from '@/commands/Command';

export default class LoadShopDetails extends Command {
    async handle (id) {
        let response = await this.service('http.groupon').getShopGrouponList(id);
        this.model.groupon.dispatch('saveShopGrouponDetails', {
            info: response
        });
        // if (response.meta['pagination']['total_pages'] > page) {
        //     await this.$command('LOAD_GROUPON_LIST', lng, lat, page + 1)
        // }
    }

    static commandName () {
        return 'LOAD_SHOP_DETAILS';
    }
}
