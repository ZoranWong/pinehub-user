import Model from './Model';
import _ from 'underscore';
import IntegralTransformer from '../models/transformers/Integral'
export default class IntegralRecords extends Model {
    constructor (app) {
        super(app);
        this.transformer = IntegralTransformer;
    }
    
    computed () {
        return _.extend(super.computed(), {
            integralRecords () {
                return this.state.integralRecords
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
            integralRecords: []
        });
    }
    
    listeners () {
        super.listeners();
        this.addEventListener('saveIntegralRecords', function ({records}) {
            _.map(records, function (record) {
                record.change = record.after - record.before;
                record.change = record.change > 0? `+${record.change}` : record.change
            });
            this.state.integralRecords = records
        })
    }
}
