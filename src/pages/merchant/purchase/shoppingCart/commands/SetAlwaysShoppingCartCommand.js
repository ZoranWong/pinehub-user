import Command from '@/commands/Command';
export default class SetAlwaysShoppingCartCommand extends Command {
	async handle(name) {
		console.log('进入 SET_ALWAYS_SHOPPING_CART COMMAND');
		try {
			await this.service('http.shoppingCart').saveAlwaysShoppingCart(name);
		} catch(e) {
			console.log('抛出异常', e);
			throw e;
		}
	}

	static commandName() {
		return 'SET_ALWAYS_SHOPPING_CART'
	}
}