/* eslint-disable space-before-function-paren */
import Model from './Model';
import _ from 'underscore';

export default class Cards extends Model {
    constructor (application) {
        super(application);
    }
    
    computed () {
        return _.extend(super.computed(), {
            statusBarHeight () {
                return this.state.statusBarHeight
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
            statusBarHeight: ''
        });
    }
    
    listeners () {
        super.listeners();
        this.addEventListener('getBarHeight', function ({height}) {
            console.log(height, '888888');
            this.state.statusBarHeight = height;
        })
    }
}
