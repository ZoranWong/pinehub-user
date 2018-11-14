export default class NearbyStore {
	constructor(NearbyStore) {
		this.id = NearbyStore['id'];
		this.name = NearbyStore['name'];
		this.lng = NearbyStore['lng'];
		this.lat = NearbyStore['lat'];
		this.address = NearbyStore['address'];
		this.mobile = NearbyStore['mobile'];
	}
}