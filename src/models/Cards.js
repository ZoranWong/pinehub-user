import Model from './Model';
import CardsTransformer from '@/models/transformers/Card';
import _ from 'underscore';

export default class Cards extends Model {
	constructor(application) {
		super(application);
		this.transformer = CardsTransformer;
	}

	computed() {
		return _.extend(super.computed(), {
			ticket() {
				return(id) => {
					return _.findWhere(this.list(), {
						id: id
					});
				}
			},
			ticketListShow() {
				let list = this.list();

				if(list.length == 0) {
					return false;
				} else {
					return true;
				}
			}
		});
	}

	listeners() {
		super.listeners();
		this.addEventListener('setCardGot', function({
			id
		}) {
			let card = _.findWhere(this.list(), {
				id: id
			});
			card.hadGet = true;
		});
	}
}