import Model from './Model'
import _ from 'underscore';
//import ShopTransformer from './transformers/Shop';
export default class Shops extends Model{
  constructor(application) {
    super(application);
  }
  computed() {
    return {
      
    };
  }
  data() {
    let data = super.data();
    return _.extend(data, {

    });
  }
  dispatchs() {
    let dispatchs = super.dispatchs();
    return _.extend(dispatchs, {
      
    });
  }

  listeners() {
    let listeners = super.listeners();
    return _.extend(listeners, {

    });
  }
}