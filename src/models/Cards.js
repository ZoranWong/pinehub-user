/* eslint-disable space-before-function-paren */
import Model from './Model';
import CardsTransformer from '@/models/transformers/Card';
import _ from 'underscore';

export default class Cards extends Model {
    constructor(application) {
        super(application);
        this.transformer = CardsTransformer;
    }

    computed() {
        return _.extend(super.computed(), {
            ticket() {
                return (id) => {
                    return _.findWhere(this.list(), {
                        id: id
                    });
                }
            },
            ticketListShow() {
                let list = this.list();
                console.log(list.length);
                if (list.length === 0) {
                    return false;
                } else {
                    return true;
                }
            }
        });
    }

    listeners() {
        super.listeners();
        this.addEventListener('setCardGot', function({ id }) {
            let idx = this.state.currentPage > 0 ? (this.state.currentPage - 1) : 0;
            if (this.state.currentPage === 0) {
                this.state.currentPage = 1;
            }
            _.map(this.state.list[idx], function (card) {
                if (card.id === id) {
                    card.hadGet = true;
                }
            });
        });
    }
}
