import Model from './Model';
export default class Orders extends Model {
	constructor(app) {
		super(app);
	}
	
	data() {
		return {
			allOrders: [],
			uncompletedOrders: [],
			completedOrders: []
		};
	}
}
