import Model from './Model';
import TicketTransformer from '@/models/transformers/Ticket';
import _ from 'underscore';
export default class Tickets extends Model {
	constructor(application) {
		super(application);
		this.transformer = TicketTransformer;
	}
	computed() {
		return _.extend(super.computed(), {
			list(state) {
				// console.log( state.list[state.currentCategoryIndex],'merchandises-models-001');
				return state.allTickets;
			},
			totalNum(state) {
				return state.totalNum;
			},
			currentCategoryIndex(state) {
				//return state.currentCategoryIndex;
			}
		});
	}
	data() {
		return {
			allTickets: [],
			availableOrders: [],
			overdueOrders: []
		}

	}

	listeners() {
		this.addEventListener('setData', function({
			list,
			totalNum,
			currentPage,
			totalPage,
			pageCount
		}, state) {
			console.log('优惠券到model------>', list,
				totalNum,
				currentPage,
				totalPage,
				pageCount)
			state.allTickets = list;
			let startIndex = (currentPage - 1) * pageCount + 1;
			console.log(currentPage, pageCount, this.transformer);
			state.allTickets = this.transform(list, this.transformer, startIndex);
			state.totalNum = totalNum;
		});
	}
}