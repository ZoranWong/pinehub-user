import Command from '@/commands/Command';

export default class LoadCommonlyUsedPoints extends Command {
    async handle (type) {
        try {
            let response = await this.service('http.store').commonlyUsedPoints();
    
           if (type === 'mall') {
               this.model.user.store.dispatch('saveCommonlyUsedPoint', {
                   points: response
               });
           } else {
               this.model.user.map.dispatch('saveMapCommonlyUsedPoint', {
                   points: response
               });
           }
        } catch (e) {
            console.log(e, 'eeeeeeeeeeeeeeeeeee');
        }
    }
    
    static commandName () {
        return 'LOAD_COMMONLY_USED';
    }
}
