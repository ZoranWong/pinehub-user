import Command from '@/commands/Command';
import  _ from 'underscore'
export default class GetGrouponOrderDetails extends Command {
    async handle (id) {
        let response = await this.service('http.groupon').getGrouponOrderDetails(id);
        console.log(response);
        if (!_.isEmpty(response)) {
            this.model.groupon.dispatch('saveGrouponOrderDetails', {
                details: response
            })
        }
    }

    static commandName () {
        return 'GET_GROUPON_ORDER_DETAILS';
    }
}
