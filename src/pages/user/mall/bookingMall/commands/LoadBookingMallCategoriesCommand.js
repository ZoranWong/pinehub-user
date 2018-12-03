import Command from '@/commands/Command';
export default class LoadBookingMallCategoriesCommand extends Command {
	async handle(page = 1) {
		try {
			let [categories, totalPage, limit, totalCount] = await this.service('http.categories').categories(page);
			this.$store.dispatch('model.bookingMall.categories/setList', {
				list: categories,
				currentPage: page,
				totalPage: totalPage,
				totalNum: totalCount,
				pageCount: limit,
			});
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}
	}
	static commandName() {
		return 'LOAD_BOOKING_MALL_CATEGORIES';
	}
}
