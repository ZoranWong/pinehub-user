import Model from './Model';
import _ from 'underscore';
import IntegralDetailTransformer from '../models/transformers/IntegralDetail'
export default class TicketDetail extends Model {
    constructor (app) {
        super(app);
        this.transformer = IntegralDetailTransformer;
    }
    
    computed () {
        return _.extend(super.computed(), {
            detailData () {
                return this.state.detailData
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
            detailData: {}
        });
    }
    
    listeners () {
        super.listeners();
        this.addEventListener('setDetailData', function ({detail}) {
            this.state.detailData = this.transform(detail);
        })
    }
}
