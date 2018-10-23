import Mock from './Mock';
export default class EmptyMerchandises extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
  }
  data(storeId) {
    return {
      "data":{
         "delete_count": this.mockMethod('integer', 0, 4)
      }     
    };
  }
}
