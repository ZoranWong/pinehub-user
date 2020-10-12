import ServiceProvider from './ServiceProvider';
// 路由跳转命令
import RouterCommand from '@/commands/RouterCommand';
import AppAccessCommand from '@/commands/AppAccessCommand';
// 登录命令
import SignInCommand from '@/commands/SignInCommand';

// 购物车基类命令
import ShoppingCartCommand from '@/commands/ShoppingCartCommand';
// 扫描命令
import ScanCommand from '@/commands/ScanCommand';

// 获取导航栏高度
import GetBarHeightCommand from '../commands/BarHeightCommand';

// import CleanCarts from '../commands/CleanCarts';

// 清空产品命令（切换分类）
import ClearModelCommand from '@/commands/ClearModelCommand';

import LoadMerchandisesCommand from '@/commands/LoadMerchandisesCommand';
import LoadAccountCommand from '@/commands/LoadAccountCommand';

import PaymentByIdCommand from '@/commands/PaymentByIdCommand';
import RegisterCommand from '@/commands/RegisterCommand';

import CreateOrderByMerchandiseIdCommand from '@/commands/CreateOrderByMerchandiseIdCommand';

// 获取店铺命令
import LoadCommonlyUsedPoints from '../commands/LoadCommonlyUsedPoints';
import LoadNearbyPoints from '../commands/LoadNearbyPoints';

// 绑定用户和店铺
import BindConsumerCommand from '../commands/BindConsumerCommand';
import SelectedPointCommand from '../pages/user/storesMap/commands/SelectedPointCommand';
import ActivateConsumerCardCommand from '../commands/ActivateConsumerCardCommand';
import GetActiveCardCommand from '../commands/GetActiveCardCommand';


export default class CommandServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app);
        this.commands = [];
    }

    register () {
        let commands = [
            RouterCommand,
            SignInCommand,
            ShoppingCartCommand,
            ScanCommand,
            ClearModelCommand,
            LoadMerchandisesCommand,
            LoadAccountCommand,
            AppAccessCommand,
            PaymentByIdCommand,
            RegisterCommand,
            CreateOrderByMerchandiseIdCommand,
            LoadCommonlyUsedPoints,
            LoadNearbyPoints,
            GetBarHeightCommand,
            // CleanCarts,
            BindConsumerCommand,
            SelectedPointCommand,
            ActivateConsumerCardCommand,
            GetActiveCardCommand
        ];
        for (let key in commands) {
            this.app.registerCommand(commands[key].commandName(), commands[key]);
        }
    }
}
