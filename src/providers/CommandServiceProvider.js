import ServiceProvider from './ServiceProvider';
//路由跳转命令
import RouterCommand from '@/commands/RouterCommand';
//登录命令
import SignInCommand from '@/commands/SignInCommand';
//把用户信息提交到服务器
import SetUserInfoCommand from '@/commands/SetUserInfoCommand';
//把手机信息提交到服务器
import SetMobileCommand from '@/commands/SetMobileCommand';
//购物车基类命令
import ShoppingCartCommand from '@/commands/ShoppingCartCommand';
//扫描命令
import ScanCommand from '@/commands/ScanCommand';
//回到顶部命令
import BackToScrollViewTopCommand from '@/commands/BackToScrollViewTopCommand';
//创建订单命令
import CreateOrderCommand from '@/commands/CreateOrderCommand';

export default class CommandServiceProvider extends ServiceProvider {
	constructor(app) {
		super(app);
		this.commands = [];
	}
	register() {
		let commands = [
			RouterCommand,
			SignInCommand,
			SetUserInfoCommand,
			SetMobileCommand,
			ShoppingCartCommand,
			ScanCommand,
			BackToScrollViewTopCommand,
			CreateOrderCommand
		];
		for(let key in commands) {
			this.app.registerCommand(commands[key].commandName(), commands[key]);
		}
	}
}