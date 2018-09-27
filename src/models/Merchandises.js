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
      list(state){
        return _.flatten(state.list);
      }
    });
  }
  data() {
    return _.extend(super.data(), {

    });
  }

  listeners() {
    super.listeners();
    this.addEventListener('a', function({b, c, d}) {

    });
  }
}