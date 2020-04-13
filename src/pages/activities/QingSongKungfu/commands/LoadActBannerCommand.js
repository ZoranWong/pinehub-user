import Command from '@/commands/Command';

export default class LoadActBannerCommand extends Command {
    async handle (id) {
        let response = await this.service('http.activities').activityBanners(id);
        if (response) {
            this.model.activity.dispatch('saveActBanners', {
                banners: response
            })
        }
    }

    static commandName () {
        return 'LOAD_ACT_BANNER_COMMAND';
    }
}
