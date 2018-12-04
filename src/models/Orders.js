import Model from './Model';
import OrdersTransformer from './transformers/Orders';
export default class Orders extends Model {
    constructor (app) {
        super(app);
        this.transformer = OrdersTransformer;
    }
}
