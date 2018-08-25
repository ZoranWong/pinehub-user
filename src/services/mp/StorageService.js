import Service from '../Service';
export default class StorageService extends Service {
  constructor($application) {
    super($application);
  }

  async set(key, value) {
    return await wx.setStorage(key, value);
  }
  async get(key) {
    return await wx.getStorage(key);
  }

  async remove(key) {
    return await wx.removeStorage(key);
  }

  async clear() {
    return await wx.clearStorage();
  }
}
