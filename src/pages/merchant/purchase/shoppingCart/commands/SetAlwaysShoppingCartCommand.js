import Command from '@/commands/Command';
export default class SetAlwaysShoppingCartCommand extends Command {
	async handle(name) {
		try {
			await this.service('http.shoppingCart').saveAlwaysShoppingCart(name);
		} catch(e) {
			throw e;
		}
	}

	static commandName() {
		return 'SET_ALWAYS_SHOPPING_CART'
	}
}
