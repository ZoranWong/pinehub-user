import ServiceProvider from './ServiceProvider';
import NotFoundExceptionHandler from '../exceptions/NotFoundExceptionHandler';

export default class ExceptionsServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app);
    }

    register () {
        this.app.registerException('notFound', NotFoundExceptionHandler);
    }
}
