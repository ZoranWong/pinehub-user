import Service from "../Service";
import fundebug from 'fundebug-wxjs';
export default class FundebugService extends Service{

    client = null;
    constructor(app) {
        super(app);
        this.client = fundebug;
        fundebug.init({
            apikey : 'def8e9015521868b5698a51bcfad2dd3884a092527f2e72f945c6a18107c104a'
        })
    }

    notify(name, options) {
        let message = options['message'];
        delete options['message'];
        this.client.notify(name, message, {metaData: options});
    }

    error(name, options) {
        let err = options['err'];
        delete options['err'];
        options['name'] = name;
        this.client.notifyError(err, name, options);
    }

    test(name, message) {
        this.client.test(name, message);
    }
}
