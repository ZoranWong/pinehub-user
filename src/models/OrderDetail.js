import Model from './Model';
import _ from 'underscore';
import {addDate} from '../utils';

export default class Orders extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            orderDetail () {
                return this.state.orderDetail
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            orderDetail: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('saveOrderDetail', function ({orderDetail}) {
            // 处理商品规格
            _.map(orderDetail['order_items'], function (item) {
                if (item['spec_value']) {
                    let specDesp = [];
                    for (let k in item['spec_value']) {
                        specDesp.push(item['spec_value'][k])
                    }
                    item.specDesp = specDesp.join(',')
                }
            });
            
            // 处理订单号
            orderDetail['order_no'] = orderDetail['order_no'].slice(-12);
            
            // 处理预约日期时间
            if (orderDetail['shop']) {
                let openTime = orderDetail['shop']['business_hours_start'] || '';
                let closeTime = orderDetail['shop']['business_hours_end'] || '';
                orderDetail['plan_pickup_date'] = addDate(orderDetail['paid_at'], 1);
                if (!openTime && !closeTime) {
                    orderDetail['plan_pickup_time'] = '暂无'
                } else {
                    if (orderDetail['paid_at']) {
                        orderDetail['plan_pickup_time'] = `${openTime} - ${closeTime}`
                    } else {
                        orderDetail['plan_pickup_time'] = '暂无'
                    }
                }
            } else {
                orderDetail['plan_pickup_date'] = addDate(orderDetail['paid_at'], 1) || '暂无';
                orderDetail['plan_pickup_time'] = '暂无';
                orderDetail['plan_pickup_time'] = '暂无';
            }
            this.state.orderDetail = orderDetail
        })
    }
}
