import Model from './Model';
import _ from 'underscore';
import SearchMerchandiseTransformer from './transformers/SearchMerchandise';
export default class SearchMerchandises extends Model {
	constructor(app) {
		super(app);
		this.transformer = SearchMerchandiseTransformer;
	}
	computed() {
    return _.extend(super.computed(), {
      list(state){
        // console.log( state.list[state.currentCategoryIndex],'merchandises-models-001');
        return state.currentPage ? _.flatten(state.list[state.currentCategoryIndex]) : [];
      },
      currentCategoryIndex(state) {
      	return state.currentCategoryIndex;
      }
    });
  }
	data() {
		return {
			
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('searchMerchandises', function({list, totalNum,currentPage,totalPage,pageCount}, state) {
			state.searchMerchandises = list;
			let startIndex = (currentPage - 1) * pageCount + 1;
			state.searchMerchandises = this.transform(list, this.transformer, startIndex);
			state.totalNum = totalNum;
		});
	}
}