/* eslint-disable space-before-function-paren */
import Model from './Model';
import _ from 'underscore';

export default class BarHeight extends Model {
    constructor (application) {
        super(application);
        // do something
        this.alias = '';
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
            this.state.statusBarHeight = height;
        })
    }
}
