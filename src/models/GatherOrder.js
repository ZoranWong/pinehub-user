import Model from './Orders';
import _ from 'underscore';
import GathOrderTransformer from './transformers/GatherOrd';
export default class GatherOrder extends Model {
	constructor(app) {
		super(app);
		this.transformer = GathOrderTransformer;
	}
}