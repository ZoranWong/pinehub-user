import {base64} from 'js-base64';
import Service from '../Service';
import _ from 'underscore';

export default class Base64Service extends Service {
    encode (data) {
        if (!_.isString(data)) {
            data = this.service('json').encode(data);
        }
        return base64.encode(data);
    }

    encodeURI (data) {
        return base64.encodeURI(data);
    }

    decode (str) {
        return base64.decode(str);
    }
}
