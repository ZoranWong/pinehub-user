import Command from './Command';
export default class GetNearestStoreCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle( ) {
    console.log('begin locate99999', this.service('location'));
    let position = await this.service('location').getLocation();
    console.log('get lnglat', position);
     // 与服务器打交道，获取数据，返回数据
    let service = this.service('http.nearestStore');
    console.log('get nearestStore', service);
    let [id,  name, address ]= await service.store( position.lng , position.lat);

    console.log(  position,'经纬度',position.lng, position.lat);
    this.store().dispatch(event, {
        id:id,
        name:name,
        address:address,
        
    });
    

  }
  static commandName() {
    return 'GET_NEAREST_STORE';
  }
}
