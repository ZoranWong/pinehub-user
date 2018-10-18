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
        return state.currentPage ? _.flatten(state.list) : [];
      },
      currentCategoryIndex(state) {
      	return state.currentCategoryIndex;
      }
    });
  }
  data() {
    return _.extend(super.data(), {
    		currentCategoryIndex: null
    });
  }

  listeners() {
    super.listeners();
    this.addEventListener('setCurrentCategory', function({categoryIndex}) {
    		this.state.currentCategoryIndex = categoryIndex;
    });
  }
}