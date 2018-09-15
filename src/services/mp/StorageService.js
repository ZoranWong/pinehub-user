import Service from '../Service';
export default class StorageService extends Service {
  constructor($application) {
    super($application);
  }

  set(key, value) {
    return new Promise((resole)  => {
      wx.setStorage({
      key: key, 
      value: value, 
      success:function(res){
        resole(res);
      }});
    });
  }
  get(key) {
    return new Promise((resole)  => {
      wx.getStorage({
      key: key, 
      success:function(res){
        resole(res);
      }});
    });
  }

  remove(key) {
    return new Promise((resole)  => {
        wx.removeStorage({
        key: key, 
        success:function(res){
          resole(res);
        }});
      });
  }

  clear() {
    return new Promise((resole)  => {
      wx.clearStorage({
      success:function(res){
        resole(res);
      }});
    });
  }
}
