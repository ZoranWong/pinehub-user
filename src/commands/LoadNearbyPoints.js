import Command from '@/commands/Command';

export default class LoadNearbyPoints extends Command {
    async handle (lng, lat, type, sLng = lng, sLat = lat, page = 1) {
        if (page === 1) {
            this.model.user.store.dispatch('clearNearbyPoints')
        }
        let response;
        let channel = type === 'mall' ? 'SHOP_KEEPER' : 'BREAKFAST_CAR';
        response = await this.service('http.store').nearbyPoints(lng, lat, channel, sLng, sLat, page);
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
            await this.$command('LOAD_NEARBY', lng, lat, type, sLng, sLat, page + 1)
        }
    }

    static commandName () {
        return 'LOAD_NEARBY';
    }
}
