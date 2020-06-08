/* eslint-disable */
import Model from './Model';
import TicketTransformer from '@/models/transformers/Ticket';
import _ from 'underscore';

export default class Tickets extends Model {
    constructor (application) {
        super(application);
        this.transformer = TicketTransformer;
    }

    computed () {
        return _.extend(super.computed(), {
            ticket () {
                return (id) => {
                    return _.findWhere(this.list(), {
                        id: id
                    });
                }
            },
            ticketsList (state) {
                return _.flatten(state.list);
            },
            ticketDetail () {
                return this.state.ticketDetail
            },
            availableCoupons () {
                return this.state.availableCoupons
            },
            canReceiveTickets () {
                return this.state.canReceiveTickets
            },
            codeTicket () {
                return this.state.codeTicket
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            ticketDetail: {},
            availableCoupons:[],
            canReceiveTickets: [],
            codeTicket: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('saveTicketDetail', function ({detail}) {
            this.state.ticketDetail = detail
        });

        this.addEventListener('saveAvailableCoupons', function ({coupons}) {
            _.map(coupons, (coupon)=>{
                coupon['title'] = coupon['coupon_name'];
                if (coupon['coupon_type'] === 'CASH') {
                    coupon.typeDesc = '现金券'
                } else {
                    coupon.typeDesc = '折扣券'
                }
                coupon.floor = coupon['floor'] > 0 ? `满${coupon['floor']}元可用` : '无门槛';
                coupon.coupon_image = coupon['banner'];
                coupon.validTime = coupon['valid_term_desc'];
                coupon['is_sharing'] = coupon['is_sharing_preferential'] ? '可与其他优惠券共享' : '不可与其他优惠券共享';
                coupon['useCondition'] = coupon['applicable_desc'] && coupon['applicable_desc'][0]['value_display'];
                this.state.availableCoupons.push(coupon)
            });

        });

        this.addEventListener('clearAvailableCoupons', function () {
            this.state.availableCoupons = [];
        });


        // 领券中心
        this.addEventListener('canReceiveTicketsList',  ({tickets}) => {
            console.log('-------------------------------------------');
            _.map(tickets, ticket=>{
                ticket.id = ticket['id'];
                ticket.cardCode = ticket['code'];
                ticket.benefit = ticket['benefit'];
                ticket.cardId = ticket['id'];
                ticket.title = ticket['name'];
                ticket.type = ticket['type'];
                ticket.description = ticket['description'];
                ticket.remark = ticket['remark'];
                ticket.coupon_image = ticket['coupon_image'];
                ticket.discount = ticket['discount'] ? (ticket['discount'] * 1) : 1;
                ticket.floor = ticket['floor'] > 0 ? `满${ticket['floor']}元可用` : '无门槛';
                ticket.useCondition = ticket['applicable_desc'] && ticket['applicable_desc'][0]['value_display'];
                ticket.status = ticket['state'];
                ticket['is_sharing'] = ticket['is_sharing'] ? '可与其他优惠券共享' : '不可与其他优惠券共享';
                ticket.statusDesc = ticket['status_desc'];
                ticket.validTime = ticket['valid_term_desc'];
                if (ticket.type === 'CASH') {
                    ticket.typeDesc = '现金券'
                } else {
                    ticket.typeDesc = '折扣券'
                }
            });
            this.state.canReceiveTickets = tickets;
        });


        // 扫码领券
        this.addEventListener('codeScanReceiveTicket', function ({ticket}) {

            ticket.benefit = ticket['benefit'];
            ticket.cardId = ticket['id'];
            ticket.title = ticket['name'];
            ticket.type = ticket['type'];
            ticket.description = ticket['description'];
            ticket.remark = ticket['remark'];
            ticket.coupon_image = ticket['coupon_image'];
            ticket.discount = ticket['discount'] ? (ticket['discount'] * 1) : 1;
            ticket.floor = ticket['floor'] > 0 ? `满${ticket['floor']}元可用` : '无门槛';
            ticket.useCondition = ticket['applicable_desc'] && ticket['applicable_desc'][0]['value_display'];
            ticket.status = ticket['state'];
            ticket['is_sharing'] = ticket['is_sharing'] ? '可与其他优惠券共享' : '不可与其他优惠券共享';
            ticket.statusDesc = ticket['status_desc'];
            ticket.validTime = ticket['valid_term_desc'];
            if (ticket.type === 'CASH') {
                ticket.typeDesc = '现金券'
            } else {
                ticket.typeDesc = '折扣券'
            }
            this.state.codeTicket = ticket;
        })
    }
}
