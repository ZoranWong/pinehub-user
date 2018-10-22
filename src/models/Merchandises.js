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
        console.log('merchandises', this.state,'001');
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
    console.log(this.state ,'002')
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
         console.log(this.state,'004')
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
      console.log(this.state,'003')
		});
  }
}
