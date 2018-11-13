import ServiceProvider from './ServiceProvider';
import RouterCommand from '@/commands/RouterCommand';
import GetTokenCommand from '@/commands/GetTokenCommand';
import GetAcountCommand from '@/commands/GetAcountCommand';
import SetUserInfoCommand from '@/commands/SetUserInfoCommand';
import SetMobileCommand from '@/commands/SetMobileCommand';
import ShoppingCartCommand from '@/commands/ShoppingCartCommand';
import ScanCommand from '@/commands/ScanCommand';
import BackToScrollViewTopCommand from '@/commands/BackToScrollViewTopCommand';

export default class CommandServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app);
        this.commands = [];
    }
    register () {
        let commands = [
          RouterCommand,
          GetTokenCommand,
          GetAcountCommand,
          SetUserInfoCommand,
          SetMobileCommand,
          ShoppingCartCommand,
          ScanCommand,
          BackToScrollViewTopCommand
        ];
        for (let key in commands) {
          this.app.registerCommand(commands[key].commandName(), commands[key]);
        }
    }
}
