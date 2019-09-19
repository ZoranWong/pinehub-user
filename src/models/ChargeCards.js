import Model from './Model';
import ChargeCardTransformer from './transformers/ChargeCard';
import _ from 'underscore';
export default class ChargeCards extends Model {
    constructor (application) {
        super(application);
        this.transformer = ChargeCardTransformer;
    }

    listeners () {
        this.addEventListener('nextPage', () => {
            this.state.currentPage++;
        });
        this.addEventListener('setList', (payload, state /* paylaod */) => {
            console.log(payload);
            this.state.list = payload.list;
        });

        this.addEventListener('reset', (payload, state /* paylaod */) => {
            _.extend(this.state, this.data());
        });
    }

    computed () {
        return {
            list () {
                return this.state.list;
            }
        };
    }
}
