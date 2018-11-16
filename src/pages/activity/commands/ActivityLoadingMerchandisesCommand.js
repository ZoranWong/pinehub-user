import Command from '@/commands/Command';
export default class ActivityLoadingMerchandisesCommand extends Command {
    constructor (app) {
      super(app);
      console.log('======新建活动商品加载命令=======');
    }
    async handle (page) {
        let id = await this.service('mp.storage').get('activityId');
        try {
          let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.merchandises').activityMerchandises(id, page);
          console.log('新品列表', merchandises, totalNum, currentPage, totalPage, limit);
          this.$store.dispatch('model.activity.merchandises/setList', {
            list: merchandises,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
          });
        } catch (e) {
          console.log('异常抛出', e);
        }
    }
    static commandName () {
      return 'ACTIVITY_LOADING_MERCHANDISES';
    }
}
