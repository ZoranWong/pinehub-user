import ServiceProvider from './ServiceProvider';
import RouterCommand from '../commands/RouterCommand';
import ScanCommand from '../commands/ScanCommand';
//import SignInCommand from '../commands/SignInCommand';
//import ReportCommand from '../commands/ReportCommand';
//import RedirectCommand from '../commands/RedirectCommand';
//import DataListCommand from '../commands/DataListCommand';
//import GetProjectsCommand from '../commands/GetProjectsCommand';
//import UpLoadCommand from '../commands/UpLoadCommand';
//import GetCouponCommand from '../commands/GetCouponCommand';
//import GetFullReduceCommand from '../commands/GetFullReduceCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = [RouterCommand, ScanCommand];
    for (let key in commands) {
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
