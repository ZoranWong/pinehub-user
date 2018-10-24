import Mock from './Mock';
export default class MyStoreScanInfo extends Mock {
	constructor(application) {
		super(application);
	}
	data() {
		console.log('myStoreScanInfo-mock')
		return {
			"data": {
				"code": "2018091208310654",
				"status": 3
			}
		};
	}
}
