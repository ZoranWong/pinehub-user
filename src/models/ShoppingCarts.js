import Model from './Model'
import _ from 'underscore';
import MerchandiseTransformer from './transformers/Merchandise';
export default class Merchandises extends Model{
  constructor(application) {
    super(application);
    this.transformer = MerchandiseTransformer;
  }
  computed() {
    return _.extend(super.computed(), {
      totalAmount(state){
        //  计算总价
        return _.flatten(state.list);
      },
      list(state){
        return state.list[0];
      }
    });
  }
  data() {
    return _.extend(super.data(), {

    });
  }
  listeners() {
    super.listeners();
    this.addEventListener('change', function({}) {
//
    });
  }
}