import Service from '../Service';

export default class SessionService extends Service {
    get (key) {
        let data = sessionStorage.getItem(key);
        return this.service('json').decode(data);
    }

    put () {
    }

    clear () {
    }

    delete () {
    }
}
