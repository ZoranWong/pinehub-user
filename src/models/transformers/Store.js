export default class Store {
    constructor (store) {
        console.log(store, '*******************************');
        this.id = store['id'];
        this.name = store['name'];
        this.lng = store['lng'];
        this.lat = store['lat'];
        this.address = store['address'];
        this.mobile = store['mobile'];
        this.openingHours = (store['start_at'] ? (store['start_at'].length > 5 ? store['start_at'].substr(0, 5) : store['start_at']) : "00:00")
        + '～' + (store['end_at'] ? (store['end_at'].length > 5 ? store['end_at'].substr(0, 5) : store['end_at']) : "24:00");
    }
}
