export default class Store {
  constructor (store) {
    this.id = store['id'];
    this.name = store['name'];
    this.lng = store['lng'];
    this.lat = store['lat'];
    this.address = store['address'];
    this.mobile = store['mobile'];
    this.openingHours = store['start_at'] + '～' + store['end_at'];
  }
}
