import Command from '@/commands/Command';

export default class LoadGrouponList extends Command {
    async handle (lng, lat, page = 1) {
        let response = await this.service('http.groupon').getGrouponList(lng, lat, page, 10);
        console.log(response, '====+++++++++_+___++_');
        this.model.activity.dispatch('saveGrouponList', {
            list: response.data
        });
        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_GROUPON_LIST', lng, lat, page + 1)
        }
    }

    static commandName () {
        return 'LOAD_GROUPON_LIST';
    }
}
