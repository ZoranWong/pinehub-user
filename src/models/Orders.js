import Model from './Model';
export Orders extends Model {
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
