import Command from '@/commands/Command';
import {searchJson} from '../../../../utils';

export default class LoadIndexBannerCommand extends Command {
    async handle () {
        try {
            let result = await this.service('http.newIndex').getIndexBanner({searchJson: searchJson({scene: 'WECHAT_MINIPROGRAM_INDEX'})});
            console.log(result, '============>s');
            if (result) {
                this.model.user.newIndex.dispatch('saveIndexBanner', {
                    banners: result
                })
            }
        } catch (e) {
            throw e;
        }
    }

    static commandName () {
        return 'LOAD_INDEX_BANNER';
    }
}
