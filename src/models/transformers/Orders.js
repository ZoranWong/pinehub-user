import {OFF_LINE_PAYMENT_ORDER, SITE_USER_ORDER, SHOPPING_MALL_ORDER, SEND_ORDER_TO_USER, USER_SELF_PICK_UP} from '@/utils/OrderDict';
const QR = require('../../../static/jssdk/weapp-qrcode.js');
export default class Order {
    constructor (order) {
        this.code = order['code'];
        this.id = order['id'];
        this.type = parseInt(order['type']);
        this.pickUpMethod = parseInt(order['pick_up_method']);
        this.status = parseInt(order['status']);
        this.merchandiseNum = order['merchandise_num'];
        this.paymentAmount = order['payment_amount'];
        this.totalAmount = order['total_amount'].toFixed(2);

        this.qrCode = QR.drawImg(`{"action":"verification","orderId":${order['id']}}`, {
            typeNumber: 4,
            errorCorrectLevel: 'M',
            size: 500
        });

        // 卡券使用
        this.cardId = (typeof order['card_id'] !== 'undefined' && order['card_id'] !== null) ? order['card_id'] : '无';
        // 销售指数
        this.sellPoint = (typeof order['sell_point'] !== 'undefined' && order['sell_point'] !== '' && order['sell_point'] !== null) ? order['sell_point'] : 0;
        // 楼号
        this.buildNum = (typeof order['build_num'] !== 'undefined' && order['build_num'] !== '' && order['build_num'] !== null) ? order['build_num'] : '无';
        // 房号
        this.roomNum = (typeof order['room_num'] !== 'undefined' && order['room_num'] !== '' && order['room_num'] !== null) ? order['room_num'] : '无';

        // btnStatus 0 没有按钮 1 支付 取消 2 确认核销 3 确认收货
        if (this.type === OFF_LINE_PAYMENT_ORDER) {
            this.btnStatus = 0;
        } else if (this.type === SITE_USER_ORDER || this.type === SHOPPING_MALL_ORDER) {
            if (this.pickUpMethod === USER_SELF_PICK_UP) {
                if (this.status === 0 || this.status === 500) {
                    this.btnStatus = 0;
                } else if (this.status === 100 || this.status === 200) {
                    this.btnStatus = 1;
                } else if (this.status === 300 || this.status === 400) {
                    this.btnStatus = 2;
                }
            } else if (this.pickUpMethod === SEND_ORDER_TO_USER) {
                if (this.status === 0 || this.status === 500) {
                    this.btnStatus = 0;
                } else if (this.status === 100 || this.status === 200) {
                    this.btnStatus = 1;
                } else if (this.status === 300 || this.status === 400) {
                    this.btnStatus = 3;
                }
            }
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
        this.orderItems = order['order_item_merchandises'];
        for (let i in this.orderItems) {
            this.orderItems[i] = {
                name: this.orderItems[i]['name'],
                sellPrice: this.orderItems[i]['sell_price'],
                quality: this.orderItems[i]['quality'],
                totalAmount: this.orderItems[i]['total_amount'],
                mainImage: this.orderItems[i]['main_image']
            }
        }
    }
}
