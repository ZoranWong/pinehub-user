import Model from './Model';
import CategoryTransformer from '@/models/transformers/Category';
import _ from 'underscore';
export default class Categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoryTransformer;
  }
  computed() {
    return _.extend(super.computed(), {

    });
  }
  data() {
    return _.extend(super.data(), {
      
    });
  }

  listeners() {
    super.listeners();
  }
}
