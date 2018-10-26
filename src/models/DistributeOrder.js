import Model from './Orders';
import _ from 'underscore';
import DisordersTransformer from './transformers/DistributeOrder';
export default class DistributeOrder extends Model {
	constructor(app) {
		super(app);
		this.transformer = DisordersTransformer;
	}
}