import Model from './Model';
import CategoryTransformer from '@/models/transformers/Category';
import _ from 'underscore';
export default class Categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoryTransformer;
  }
  // 预定商城里商品分类
  computed() {
    return _.extend(super.computed(), {
      categories(state){
        return this.state.currentPage ? _.flatten(state.list) : [];
      },
      categoryId(state) {
        let list = this.state.currentPage ? _.flatten(state.list) : [];
        return (i) =>{
          for(var i = 0; i < list.length; i++){
            let category = list[i];
            return category ? category.id : null;
          }  
        }
      }
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
