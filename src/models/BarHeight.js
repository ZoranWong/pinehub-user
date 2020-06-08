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
            },
            navHeight () {
                return this.state.navHeight
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            statusBarHeight: '',
            navHeight: 0
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('getBarHeight', function ({height,isIOS}) {
            this.state.statusBarHeight = height;
            this.state.navHeight = isIOS ? 44 : 48;
        })
    }
}
