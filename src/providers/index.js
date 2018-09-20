import AppServiceProvider from './AppServiceProvider';
import HttpServiceProvider from './HttpServiceProvider';
import CommandServiceProvider from './CommandServiceProvider';
import ModelsServiceProvider from './ModelsServiceProvider';
import ConfigServiceProvider from './ConfigServiceProvider';
import MixinMethodsServiceProvider from './MixinMethodsServiceProvider';
import RouterServiceProvider from './RouterServiceProvider';
export default {
	commandServiceProvider: CommandServiceProvider,
	configServiceProvider: ConfigServiceProvider,
	appServiceProvider: AppServiceProvider,
	httpServiceProvider: HttpServiceProvider,
	modelsServiceProvider: ModelsServiceProvider,
	mixinMethodsServiceProvider: MixinMethodsServiceProvider,
	RouterServiceProvider: RouterServiceProvider
};