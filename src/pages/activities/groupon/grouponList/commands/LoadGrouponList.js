import Command from '@/commands/Command';

export default class LoadGrouponList extends Command {
    async handle (lng, lat, page = 1, search = null) {
        if (page === 1) {
            this.model.groupon.dispatch('saveGrouponList', {list: null});
        }
        let response = await this.service('http.groupon').showLoading(page === 1).getGrouponList(lng, lat, page, search);
        let list = response.data;
        this.model.groupon.dispatch('saveGrouponList', {
            list: list
        });
        this.$forceUpdate();
        if (response.meta['pagination']['total_pages'] > page) {
            await new Promise((resolve) => {
                setTimeout(async () => {
                    await this.$command('LOAD_GROUPON_LIST', lng, lat, page + 1, search)
                }, 1500);
            });
        }
    }

    static commandName () {
        return 'LOAD_GROUPON_LIST';
    }
}
