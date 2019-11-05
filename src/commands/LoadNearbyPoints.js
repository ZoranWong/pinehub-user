import Command from '@/commands/Command';

export default class LoadNearbyPoints extends Command {
    async handle (lng, lat, type) {
        let response;
        let channel = type === 'mall' ? 'SHOP_KEEPER' : 'BREAKFAST_CAR';
        response = await this.service('http.store').nearbyPoints(lng, lat, channel);
    
        if (type === 'mall') {
            this.model.user.store.dispatch('saveNearbyPoints', {
                points: response
            });
        } else {
            this.model.user.map.dispatch('saveMapNearbyPoints', {
                points: response
            });
        }
    }
    
    static commandName () {
        return 'LOAD_NEARBY';
    }
}
