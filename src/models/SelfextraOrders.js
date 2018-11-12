import Model from './Orders';
import _ from 'underscore';
import SelfextraTransformer from './transformers/SelfextraOrders';
export default class SelfextraOrders extends Model {
	constructor(app) {
		super(app);
		this.transformer = SelfextraTransformer;
	}
}