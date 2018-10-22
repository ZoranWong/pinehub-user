import Command from './Command';
export default class GetNearestStoreCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle() {
    let position = await this.service('location').getLocation();
    let service = this.service('http.nearestStore');
  
    let [id, name, address]= await service.store( position.lng , position.lat);
 
    // console.log(  position,'经纬度',position.lng, position.lat, address);
    this.store().dispatch('model.nearestStore/location', {
        id:id,
        name:name,
        address:address,
       
    });
    

  }
  static commandName() {
    return 'GET_NEAREST_STORE';
  }
}
