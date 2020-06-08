import Model from './Model';
import _ from 'underscore';

export default class StoreMap extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
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
