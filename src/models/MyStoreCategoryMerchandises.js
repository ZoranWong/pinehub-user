import Model from './Model';
import _ from 'underscore';
import MerchandiseTransformer from '@/models/transformers/MyStoreMerchandise';
export default class MyStoreCategoryMerchandises extends Model {
	constructor(app) {
		super(app);
		this.transformer = MerchandiseTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			merchandisesList(state) {
				return this.list();
			},
			currentCategoryIndex(state) {
				return state.currentCategoryIndex;
			}
		});
	}
	data() {
		return _.extend(super.data(), {
			currentCategoryIndex: null
		})
	}
	//监听数据
	listeners() {
		super.listeners();
	}
	setList(payload, state) {
		super.setList(payload, state);
		this.state.currentCategoryIndex = payload.currentCategoryIndex;
	}
}
