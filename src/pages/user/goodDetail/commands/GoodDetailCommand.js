import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (type, id, actId) {
        let result;
        if (type === 'mall') {
            result = await this.service('http.store').mallGoodDetail(id);
        } else if (type === 'breakfast') {
            result = await this.service('http.store').breakfastGoodDetail(id);
        } else if (type === 'activity') {
            result = await this.service('http.activities').activityProductDetails(id, actId);
        }
        console.log(result, '?????????????');
        this.model.user.goodDetail.dispatch('setGoodDetail', {
            good: result
        })
    }

    static commandName () {
        return 'GOOD_DETAIL_COMMAND';
    }
}
