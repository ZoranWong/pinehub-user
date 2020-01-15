import Model from './Model';
import _ from 'underscore';

export default class QSKungfu extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            addresses () {
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
        };
    }

    // 监听数据
    listeners () {

    }
}
