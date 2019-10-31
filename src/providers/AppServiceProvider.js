/* eslint constructor-super: "error" */
/* eslint-env es6 */
import ServiceProvider from './ServiceProvider';
import MpAuthService from '@/services/mp/AuthService';
import SessionService from '@/services/cache/SessionService';
import Base64Service from '@/services/encrypt/Base64Service';
import MD5Service from '@/services/encrypt/MD5Service';
import JsonService from '@/services/encrypt/JsonService';
import HrefService from '@/services/mp/HrefService';
import ScanCodeService from '@/services/mp/ScanCodeService';
import PopupService from '@/services/mp/PopupService';
import TencentMapService from '@/services/mp/TencentMapService';
import StorageService from '@/services/mp/StorageService';
import PaymentService from '@/services/mp/PaymentService';
import _ from 'underscore';

export default class AppServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app)
        _.extend(Date.prototype, {
            format (format) {
                let o = {
                    'M+': this.getMonth() + 1, // month
                    'd+': this.getDate(), // day
                    'h+': this.getHours(), // hour
                    'm+': this.getMinutes(), // minute
                    's+': this.getSeconds(), // second
                    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
                    'S': this.getMilliseconds() // millisecond
                }
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
                }
                for (let k in o) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
                    }
                }
                return format
            }
        });
        _.extend(String.prototype, {
            trim (char, type) {
                if (char) {
                    if (type === 'left') {
                        return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
                    } else if (type === 'right') {
                        return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
                    }
                    return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
                }
                return this.replace(/^\s+|\s+$/g, '');
            }
        });
    }

    register () {
        this.app.register('base64', Base64Service);
        this.app.register('md5', MD5Service);
        this.app.register('json', JsonService);
        this.app.register('mp.auth', MpAuthService);
        this.app.register('session', SessionService);
        this.app.register('href', HrefService);
        this.app.register('scan', ScanCodeService);
        this.app.register('popup', PopupService);
        this.app.register('map', TencentMapService);
        this.app.register('mp.storage', StorageService);
        this.app.register('mp.payment', PaymentService);
    }

    boot () {

    }
}
