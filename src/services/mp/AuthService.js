import Service from '@/services/Service';

export default class AuthService extends Service {
  constructor(application) {
    super(application);
  }

  code() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: ({code}) => {return resolve(code)},
        fail: (res) => {return reject(res)}
      });
    });
  }

  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: () => {return resolve(true)},
        fail: () => {return reject(false)}
      });
    });
  }

  code2Session() {
    
  }
}
