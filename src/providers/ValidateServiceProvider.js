import ServiceProvider from './ServiceProvider';
export default class ValidateServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    let validate = this.validates();
    this.app.register('validater', validate);
  }
  validates() {
   
   return {
      password(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if(!regular.test(value) && process.env.NODE_ENV === "production") {
          callback(new Error('请输入6位以上，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'));
        } else {
          callback();
        }
      },

      unsignedInt(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /^([1-9][0-9]*)$/;
        if(!regular.test(value)) {
          callback(new Error('请输入大于0的整数数值'));
        } else {
          callback();
        }
      },
      //数字大于0有两位小数的验证
      number(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
        if(!regular.test(value)) {
          callback(new Error('请输入最多为两位小数的正数数值'));
        } else {
          callback();
        }
      },
      //手机格式校验
      mobile(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /^1[3|4|5|7|8]\d{9}$/;
        if(!regular.test(value)) {
          callback(new Error('请输入正确格式手机号'));
        } else {
          callback();
        }
      },
      //邮箱格式校验
      email(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(!regular.test(value)) {
          callback(new Error('请输入正确格式邮箱'));
        } else {
          callback();
        }
      },
      //数字是整数验证
      disscount(rule, value, callback) {
        if(value === '') {
          callback();
          return;
        }
        let regular = /[\d]?(\.[\d]{0,2})?/;
        if(!regular.test(value)) {
          callback(new Error('折扣必须大于0并且小于10，且小于2位小数'));
        } else {
          callback();
        }
      }
    }
  }
}
