import Command from '@/commands/Command';

export default class LoadNearbyPoints extends Command {
    async handle (lng, lat, type) {
        let response;
        
        response = await this.service('http.store').nearbyPoints(lng, lat);
    
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
