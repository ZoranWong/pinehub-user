import Model from './Model';
import _ from 'underscore';

export default class Recharge extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            cards () {
                return this.state.cards
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            cards: []
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('saveRechargeCards', function ({cards}) {
            this.state.cards = cards;
        })
    }
}
