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
                if (orderDetail['paid_at']) {
                    // let paidAt = orderDetail['paid_at'].split(' ');
                    // let paidAtTime = '';
                    // if (paidAt[1]) {
                    //     paidAtTime = paidAt[1].split(':')[0];
                    //     if (Number(paidAtTime) < 21) {
                    //         orderDetail['plan_pickup_date'] = addDate(orderDetail['paid_at'], 1);
                    //     } else {
                    //         orderDetail['plan_pickup_date'] = addDate(orderDetail['paid_at'], 2);
                    //     }
                    // } else {
                    //     orderDetail['plan_pickup_date'] = addDate(orderDetail['paid_at'], 1);
                    // }
                    orderDetail['plan_pickup_date'] = orderDetail['expect_receive_date']
                } else {
                    orderDetail['tipInfo_tomorrow'] = '当日21:00前下单，明日取货';
                    orderDetail['tipInfo_other'] = `当日21:00后下单，后日取货`;
                }

                let openTime = orderDetail['shop']['business_hours_start'] || '';
                let closeTime = orderDetail['shop']['business_hours_end'] || '';
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
            }

            if (orderDetail.order_type === 'ACTIVITY_PRODUCT_ORDER') {
                orderDetail['plan_pickup_date'] = orderDetail['expect_receive_date'];
                orderDetail['plan_pickup_time'] = orderDetail['expect_receive_time_start'] + '-' + orderDetail['expect_receive_time_end'];
            }


            this.state.orderDetail = orderDetail
        })
    }
}
