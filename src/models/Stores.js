import Model from './Model';
import _ from 'underscore';
import StoreTransformer from '@/models/transformers/Store';

export default class Stores extends Model {
    constructor (app) {
        super(app);
        this.transformer = StoreTransformer;
    }

    computed () {
        return _.extend(super.computed(), {
            stores () {
                let list = this.list();
                return list;
            },
            store () {
                return (id) => {
                    let list = this.list();
                    return _.find(list, {id: id});
                }
            }
        });
    }
}
