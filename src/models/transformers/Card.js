export default class Ticket {
    constructor (ticket) {
        this.id = ticket['id'];
        this.cardId = ticket['card_id']
        this.title = ticket['info']['base_info']['title'];
        this.type = ticket['type'];
        this.hadGet = false;
        if (this.type === 'discount') {

            this.discount = ticket['info']['discount'] ? (ticket['info']['discount'] * 1) : 1;
            this.content = this.discount + ' 折';

        } else if (this.type === 'cash') {

            this.reduceCost = ticket['info']['reduce_cost'];
            this.content = '￥' + this.reduceCost;

        }

        this.leastCost = ticket['info']['least_cost'];

        this.dType = ticket['info']['base_info']['date_info']['type'];
        if (this.dType === "DATE_TYPE_FIX_TERM") {
            this.dateInfo = (ticket['info']['base_info']['date_info']['fixed_begin_term'] === 0 ? '领取后,' : '领取次日,') +
                (ticket['info']['base_info']['date_info']['fixed_term'] + '天内有效！')
        } else if (this.dType === "DATE_TYPE_FIX_TIME_RANGE") {

            let beginTimestamp = ticket['info']['base_info']['date_info']['begin_timestamp'] * 1000;
            let endTimestamp = ticket['info']['base_info']['date_info']['end_timestamp'] * 1000;

            this.dateInfo = (new Date(beginTimestamp)).format('yyyy-MM-dd') +
                '~' + (new Date(endTimestamp)).format('yyyy-MM-dd');
        }
    }
}
