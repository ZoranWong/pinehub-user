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
        // return state.currentPage ? _.flatten(state.list[state.categoryId]) : [];
        return state.currentPage ? _.flatten(state.list) : [];
      }
    });
  }
  data() {
    return _.extend(super.data(), {
      categoryId: null
    });
  }

  listeners() {
    super.listeners();
    // this.addEventListener('setCategoryId', function({categoryId}) {
    //   this.state.categoryId = categoryId;
    // });
  }
}