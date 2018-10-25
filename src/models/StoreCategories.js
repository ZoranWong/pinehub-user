import Model from './Model';
import StoreCategoryTransformer from '@/models/transformers/StoreCategory';
import _ from 'underscore';
export default class StoreCategories extends Model{
  constructor(application) {
    super(application);
    this.transformer = StoreCategoryTransformer;
  }
  // 当日下单的商品分类
  computed() {
    return _.extend(super.computed(), {
      storeCategories(state){
        return this.state.currentPage ? _.flatten(state.list) : [];
      },
      storeCategoryId(state) {
        let list = this.state.currentPage ? _.flatten(state.list) : [];
        console.log(list, "墨刀",this.state.currentPage)
        return (i) =>{
          for(var i = 0; i < list.length; i++){
            let category = list[i];
            console.log(category.id,"给你听歌")
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
