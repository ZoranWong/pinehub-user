import Mock from './Mock';
export default class ReduceMerchandises extends Mock {
  constructor(application) {
    super(application);
  }
  data() {
    if(Math.random() > 0.5) {
      return this.success();
    }else{
      return this.fail();
    }
  }

  success() {
    return {
       "data": {
          "id|+2": 1,
          "merchandise_id": 2,
          "name": this.mockMethod('name'),
          "quality": 4,
          "sell_price": 4,
          "amount": 16
       }
    };
  }
  
  fail() {
     return {
       "data": {
          "delete_count": true
       }
    };
  }
}
