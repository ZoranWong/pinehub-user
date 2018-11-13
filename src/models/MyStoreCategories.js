import Model from './Model';
import _ from 'underscore';
export default class MyStoreCategories extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			list(state) {
				console.log('获取店铺=======产品分类=======内容', state);
				return state.list;
			},
			totalNum(state) {
				return state.totalNum;
			},
			currentPage(state) {
				return state.currentPage;
			},
			totalPage(state) {
				return state.totalPage;
			},
			firstCategoryId(state){
				return this.list(state)[0]['id'];
			}
		});
	}
	data() {
		return {
			list: [],
			totalNum: [],
			currentPage: [],
			totalPage: []
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('setList', function({
			list,
			totalNum,
			currentPage,
			totalPage
		}) {
			this.state.list = list;
			this.state.totalNum = totalNum;
			this.state.currentPage = currentPage;
			this.state.totalPage = totalPage;
		});
	}
}