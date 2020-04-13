import Command from '@/commands/Command';

export default class ChangeBuyNumCommand extends Command {
    async handle (item, num, actId) {
        if (num <= 0) {
            let response = await this.service('http.activities').deleteItem(item.id, actId);
            this.model.activity.dispatch('removeGoodsFromCart', {
                goods: item
            });
            return
        }

        if (item['stock_num'] < num) {
            this.$application.popup.toast('库存不足', 'none', 2000);
            return
        }



        let response = await this.service('http.activities').changeBuyNum(item.id, num);


        // console.log('----- request -----', Date.now());
        if (response) {
            this.model.activity.dispatch('changeBuyNum', {
                id: item.id,
                num: num
            });
            // this.model.activity.dispatch('clearIds')
        }

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'CHANGE_ACTIVITY_BUY_NUM_COMMAND';
    }
}
