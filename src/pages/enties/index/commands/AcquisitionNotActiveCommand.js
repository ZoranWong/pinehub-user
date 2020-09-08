import Command from '@/commands/Command';
import { identity } from 'underscore';

export default class AcquisitionNotActiveCommand extends Command {
    async handle () {
        // if (page === 1) {
        //     this.model.account.dispatch('clearAcquisitionNotActive')
        // }
        let response = await this.service('http.account').noActiveCard();
        //每一张卡id做缓存
        this.model.account.dispatch('saveAcquisitionNotActive', {
            notActivecards: response.data,
        });

    }

    static commandName () {
        return 'ACQUISTION_NOT_ACTIVE';
    }
}
