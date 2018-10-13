import _ from 'underscore';
export default class Model {
	constructor(application) {
		this.$application = application;
		this.state = this.data();
		this.getters = this.computed();
		this.actions = [];
		this.mutations = [];
		this.transformer = null;
		this.listeners();
	}

	data() {
		return {
			list: [],
			pageCount: 0,
			currentPage: 0,
			totalNum: 0,
		};
	}
	computed() {
		return {

		};
	}

	listeners() {
		this.addEventListener('nextPage', () => {
			this.state.currentPage++;
		});

		this.addEventListener('reset', () => {
			this.state = {};
		});

		this.addEventListener('setList', ({
			list,
			currentPage,
			totalPage,
			totalNum,
			pageCount
		} /*paylaod*/ ) => {
			console.log('model', list, totalNum, currentPage, totalPage);
			this.state.currentPage = currentPage;
			let startIndex = (currentPage - 1) * pageCount + 1;
			this.state.list[currentPage - 1] = this.transform(list, this.transformer, startIndex);
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

	services(name) {
		return this.$application.instances[name];
	}

	transform(data, transformer, startIndex = 1) {
		if(_.isArray(data)) {
			return _.map(data, function(value, index) {
				value.index = startIndex + index;
				return new transformer(value);
			});
		} else {
			return new transformer(data);
		}
	}

	addEventListener(type, callback) {
		this.actions[type] = ({
			commit
		}, payload) => {
			console.log(payload);
			commit(type, payload);
		}

		this.mutations[type] = (state, payload) => {
			console.log(payload);
			callback.call(this, payload);
		}
	}
}