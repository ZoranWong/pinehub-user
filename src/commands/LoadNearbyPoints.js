import Command from '@/commands/Command';

export default class LoadNearbyPoints extends Command {
    async handle (lng, lat) {
        let response;
        
        response = await this.service('http.store').nearbyPoints(lng, lat);
    
        console.log(response, '===================nearbyPoints==========================');
    
        this.model.user.store.dispatch('saveNearbyPoints', {
            points: response
        });
    }
    
    static commandName () {
        return 'LOAD_NEARBY';
    }
}
