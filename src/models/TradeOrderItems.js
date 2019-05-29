import Model from './Model';
import TradeOrderItemTransformer from './transformers/TradeOrderItem';
export default class ChargeCards extends Model {
    constructor (application) {
        super(application);
        this.transformer = TradeOrderItemTransformer;
    }
}
