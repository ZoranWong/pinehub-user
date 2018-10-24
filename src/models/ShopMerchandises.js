import Model from './Model'
import _ from 'underscore';
import ShopMerchandisesTransformer from './transformers/ShopMerchandises';

export default class ShopMerchandises extends Model{
  constructor(application) {
    super(application);
    this.transformer = ShopMerchandisesTransformer;
  }
  computed() {
    return _.extend(super.computed(), {
      list(state){
        // console.log('shopMerchandises', this,999999999);
        return state.currentPage ? _.flatten(state.list[state.currentCategoryIndex]) : [];
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

		this.addEventListener('setList', ({
			list,
			currentPage,
			totalPage,
			totalNum,
			pageCount
		} /*paylaod*/ ) => {
			this.state.currentPage = currentPage;
			let startIndex = (currentPage - 1) * pageCount + 1;
      if(!this.state.list[this.state.currentCategoryIndex]) {
        this.state.list[this.state.currentCategoryIndex]  = [];
      }
			this.state.list[this.state.currentCategoryIndex][currentPage - 1] = this.transform(list, this.transformer, startIndex);
			if(totalNum !== null)
				this.state.totalNum = totalNum;
			if(totalPage !== null) {
				this.state.totalPage = totalPage;
				if(pageCount !== null) {
					this.state.pageCount = pageCount;
				}
			}
		});
  }
}
