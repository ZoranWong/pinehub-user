import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (type, id) {
        console.log(type, '!!!!!!!!!!1');
        console.log('id', id);
        let result;
        if (type === 'mall') {
            result = await this.service('http.store').mallGoodDetail(id);
        } else if (type === 'breakfast') {
            result = await this.service('http.store').breakfastGoodDetail(id);
        } else if (type === 'activity') {
            console.log('111111111111111111');
            result = await this.service('http.activities').activityProductDetails(id);
        }
        this.model.user.goodDetail.dispatch('setGoodDetail', {
            good: result
        })
    }

    static commandName () {
        return 'GOOD_DETAIL_COMMAND';
    }
}
