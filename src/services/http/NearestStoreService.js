import ApiService from './ApiService';
export default class NearestStoreService extends ApiService {
  async nearestStore (lng, lat) {
    let response = null;
    if (this.$application.needMock()) {
      response = await this.services('mock.neareststore').mock(lng, lat);
      // console.log(response.data.lng, response.data.lat,"store店铺",response.data.address);
    } else {
      // 服务器交互代码
      response = await this.httpGet(`/nearest/store`, {
        lng: lng,
        lat: lat
      });
    }
    return response.data;
  }
}
