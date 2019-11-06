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
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
            ticketDetail: {},
            availableCoupons:[]
        });
    }
    
    listeners () {
        super.listeners();
        this.addEventListener('saveTicketDetail', function ({detail}) {
            this.state.ticketDetail = detail
        });
        
        this.addEventListener('saveAvailableCoupons', function ({coupons}) {
            console.log(coupons, '::::::::::::::::::::::');
            this.state.availableCoupons = coupons
        })
    }
}
