import Model from './Model'
import _ from 'underscore';
import MerchandiseTransformer from './transformers/Merchandise';
export default class Merchandises extends Model{
  constructor(application) {
    super(application);
    this.transformer = MerchandiseTransformer;
  }  //MerchandiseList的model层
  computed() {
    return _.extend(super.computed(), {
      list(state){
        // console.log( state.list[state.currentCategoryIndex],'merchandises-models-001');
        return state.currentPage ? _.flatten(state.list) : [];
      },
      currentCategoryIndex(state) {
      	return state.currentCategoryIndex;
      }
    });
  }
  data() {
    return _.extend(super.data(), {
    		currentCategoryIndex: 0
    });
  }

  listeners() {
    super.listeners();
    this.addEventListener('setCurrentCategory', function({categoryIndex}) {
    		this.state.currentCategoryIndex = categoryIndex;
    });
    //console.log(this.state ,'merchandises-models-002')
		this.addEventListener('setList', ({
			list,
			currentPage,
			totalPage,
			totalNum,
			pageCount
		} /*paylaod*/ ) => {
      let merchandises = this.state.list;
			this.state.currentPage = currentPage;
			let startIndex = (currentPage - 1) * pageCount + 1;

			merchandises = this.transform(list, this.transformer, startIndex);
			if(totalNum !== null)
				this.state.totalNum = totalNum;
			if(totalPage !== null) {
				this.state.totalPage = totalPage;
				if(pageCount !== null) {
					this.state.pageCount = pageCount;
				}
			}
      this.$application.$vm.set(this.state.list, currentPage - 1, merchandises);
      console.log(this.state,'merchandises-models-004')
		});
  }
}
