import Command from '@/commands/Command';

export default class SearchPoints extends Command {
    async handle (sLat, sLng, type, page = 1, search = '') {
        if (page === 1) {
            this.model.user.store.dispatch('clearNearbyPoints')
        }
        let channel = type === 'mall' ? 'SHOP_KEEPER' : 'BREAKFAST_CAR';
        let response = await this.service('http.store').searchPoints(sLng, sLat, channel, page, search);
        if (type === 'mall') {
            this.model.user.store.dispatch('saveNearbyPoints', {
                points: response.data
            });
        } else {
            this.model.user.map.dispatch('saveMapNearbyPoints', {
                points: response.data
            });
        };

        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('SEARCH_POINTS', sLat, sLng, type, page + 1, search)
        }
    }

    static commandName () {
        return 'SEARCH_POINTS';
    }
}
