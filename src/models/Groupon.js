import Model from './Model';
import _ from 'underscore';
import moment from "moment";
export default class Activity extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            grouponList () {
                return this.state.grouponList
            },
            grouponDetails () {
                return this.state.grouponDetails
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            grouponList: [],
            grouponDetails: {}
        };
    }

    handleTimer (time) {
        console.log(time, '+++++');
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let deadline = moment(time);
        return deadline.diff(now, 'second')
    }


    // 监听数据
    listeners () {
        let that = this;
        this.addEventListener('saveGrouponList', function ({list}) {
            _.map(list, item => {
                if (_.find(this.state.grouponList, function (listItem) {
                    return listItem.id === item.id
                })) {
                    return
                }
                let dis = Math.round(item.distance);
                if (dis > 1000) {
                    item.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    item.formatDistance = dis + '米'
                }
                if (item['group_products'].length > 3) {
                    item.display_products = item['group_products'].slice(0, 3)
                } else {
                    item.display_products = item['group_products']
                }

                that.state.grouponList.push(item)
            })
        });

        this.addEventListener('saveGrouponDetails', function ({details}) {
            if (details['regiments'].length) {
                _.map(details['regiments'], user => {
                    if (user['order_product']) {
                        let text = '';
                        _.map(user['order_product'], product => {
                            text += `${product.name} X ${product.quantity}、`
                        });
                        text = text.substring(0, text.length - 1);
                        user['purchased_products'] = text || '暂无'
                    }
                })
            };
            details.deadlineTime = this.handleTimer(details['orderable_deadline']);
            this.state.grouponDetails = details;
        })
    }
}
