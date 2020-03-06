
// 取货方式
// const QR = require('../../../static/jssdk/weapp-qrcode.js');
export default class Order {
    constructor (order) {
        this.code = order['order_no'].slice(-12);
        this.id = order['id'];
        this.type = order['order_type'];
        this['after_service_state'] = order['after_service_state'];
        this.pickUpMethod = parseInt(order['pick_up_method']);
        this.status = parseInt(order['status']);
        this.merchandiseNum = order['merchandise_num'];
        this.paymentAmount = order['payment_amount'];
        this.stateDesc = order['state_desc'];
        this['settlement_total_fee'] = order['settlement_total_fee'];
        this.show = true;
        this['can_cancel'] = order['can_cancel'];
        this['can_pay'] = order['can_pay'];
        this.top = 0;
        // 卡券使用
        this.cardId = (typeof order['card_id'] !== 'undefined' && order['card_id'] !== null) ? order['card_id'] : '无';
        // 销售指数
        this.sellPoint = (typeof order['sell_point'] !== 'undefined' && order['sell_point'] !== '' && order['sell_point'] !== null) ? order['sell_point'] : 0;
        // 楼号
        this.buildNum = (typeof order['build_num'] !== 'undefined' && order['build_num'] !== '' && order['build_num'] !== null) ? order['build_num'] : '无';
        // 房号
        this.roomNum = (typeof order['room_num'] !== 'undefined' && order['room_num'] !== '' && order['room_num'] !== null) ? order['room_num'] : '无';

        // btnStatus  1 支付 取消 2 确认核销 3 确认收货
        // SITE_USER_ORDER => 站点订单 SHOPPING_MALL_ORDER => 商城订单 USER_SELF_PICK_UP => 自提订单
        if (this.stateDesc === '待付款') {
            this.btnStatus = 0;   // 0 再来一单 去付款
        } else if (this.stateDesc === '待自提') {
            this.btnStatus = 1;   // 1 取消订单 再来一单 去取货
        } else if (this.stateDesc === '已完成') {
            this.btnStatus = 2;  // 申请售后 再来一单
        } else if (this.stateDesc === '已支付') {
            this.btnStatus = 4   // 再来一单
        } else if (this.stateDesc === '配送中') {
            this.btnStatus = 5   // 再来一单
        } else {
            this.btnStatus = 3   // 再来一单
        }
        // 转换为中文
        switch (this.status) {
            case 0:
                this.status = '已取消';
                break;
            case 100:
                this.status = '待支付';
                break;
            case 200:
                this.status = '支付中';
                break;
            case 300:
                this.status = '已支付';
                break;
            case 400:
                this.status = '已发货';
                break;
            case 500:
                this.status = '已完成';
                break;
            case 600:
                this.status = '支付失败';
                break;
            default:
                this.status = '';
                break;
        }

        this.quantity = order['quantity'];
        this.receiverName = (typeof order['receiver_name'] !== 'undefined' && order['receiver_name'] !== '' && order['receiver_name'] !== null) ? order['receiver_name'] : '无';
        this.receiverMobile = (typeof order['receiver_mobile'] !== 'undefined' && order['receiver_mobile'] !== '' && order['receiver_mobile'] !== null) ? order['receiver_mobile'] : '无';
        this.receiverAddress = order['receiver_address'];
        this.createdAt = order['created_at'];
        this.createdAtSp = (new Date(order['created_at'])).format('MM/dd/h:m');
        this.customer = order['customer'];
        this.orderItems = order['order_items'];
        this.pick_date = order['pick_date'];
        this.channel = order['channel'];
        this.shop = order['shop'];
        this.paidTime = order['paid_time'];
        this.state = order['state'];
        this['delivery_type'] = order['delivery_type'];
        this['auto_cancel_after_seconds'] = order['auto_cancel_after_seconds'];
        this['settlement_total_fee_format'] = order['settlement_total_fee_format'];
        this.orderItems.forEach(item => {
           if (item['spec_value']) {
               let specDesp = [];
               for (let k in item['spec_value']) {
                   specDesp.push(item['spec_value'][k])
               }
               item.specDesp = specDesp.join(',')
           }
        });
        for (let i in this.orderItems) {
            this.orderItems[i] = {
                name: this.orderItems[i]['name'],
                sellPrice: this.orderItems[i]['price'],
                quantity: this.orderItems[i]['quantity'],
                totalAmount: this.orderItems[i]['total_fee'],
                mainImage: this.orderItems[i]['thumbnail'],
                specDesp: this.orderItems[i]['specDesp']
            }
        }
    }
}
