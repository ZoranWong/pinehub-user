import AppServiceProvider from './AppServiceProvider';
import MockServiceProvider from './MockServiceProvider';
import HttpServiceProvider from './HttpServiceProvider';
import CommandServiceProvider from './CommandServiceProvider';
import ModelsServiceProvider from './ModelsServiceProvider';
import ConfigServiceProvider from './ConfigServiceProvider';
import MixinMethodsServiceProvider from './MixinMethodsServiceProvider';
import RouterServiceProvider from './RouterServiceProvider';

export default {
    commandServiceProvider: CommandServiceProvider,
    configServiceProvider: ConfigServiceProvider,
    mockServiceProvider: MockServiceProvider,
    appServiceProvider: AppServiceProvider,
    httpServiceProvider: HttpServiceProvider,
    mixinMethodsServiceProvider: MixinMethodsServiceProvider,
    RouterServiceProvider: RouterServiceProvider,
    modelsServiceProvider: ModelsServiceProvider
};
