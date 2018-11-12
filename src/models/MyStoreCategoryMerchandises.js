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
				console.log('state----index',state);
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
		console.log('ABCDEFG');
		super.listeners();
	}
	setList(payload, state) {
		super.setList(payload, state);
		console.log('ABCDEFG',payload);
		this.state.currentCategoryIndex = payload.currentCategoryIndex;
	}
}
