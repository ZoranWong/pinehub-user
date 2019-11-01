import Model from './Model';
import _ from 'underscore';
import IntegralTransformer from '../models/transformers/Integral'
export default class Integral extends Model {
    constructor (app) {
        super(app);
        this.transformer = IntegralTransformer;
    }
    
    computed () {
        return _.extend(super.computed(), {
            integralProducts (state) {
                return _.flatten(state.list);
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
        
        });
    }
    
    listeners () {
        super.listeners();
    }
}
