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
                coupon.validTime = coupon['valid_term_desc']
            });
            this.state.availableCoupons = coupons
        });


        // 领券中心
        this.addEventListener('canReceiveTicketsList', function ({tickets}) {
            this.state.canReceiveTickets = tickets;
        });


        // 扫码领券
        this.addEventListener('codeScanReceiveTicket', function ({ticket}) {
            this.state.codeTicket = ticket;
        })
    }
}
