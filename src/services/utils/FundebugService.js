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
        console.log("notify日志已打出="+name)
        let message = options['message'];
        delete options['message'];
        this.client.notify(name, message, {metaData: options});
    }

    error(name, options) {
        console.log("error日志已打出="+name)
        let err = options['err'];
        delete options['err'];
        options['name'] = name;
        this.client.notifyError(err, name, options);
    }

    test(name, message) {
        console.log("test日志已打出="+name)
        this.client.test(name, message);
    }
}
