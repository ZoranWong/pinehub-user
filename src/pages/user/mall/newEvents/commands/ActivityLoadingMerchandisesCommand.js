import Command from '@/commands/Command';
export default class ActivityLoadingMerchandisesCommand extends Command {
    constructor (app) {
      super(app);
    }
    async handle (page) {
        try {
          let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.merchandises').activityMerchandises(page);
          this.$store.dispatch('model.newEvents.merchandises/setList', {
            list: merchandises,
            totalNum: totalNum,
            currentPage: currentPage,
            totalPage: totalPage,
            pageCount: limit
          });
        } catch (e) {
            return false;
        }
    }
    static commandName () {
      return 'ACTIVITY_LOADING_MERCHANDISES';
    }
}
