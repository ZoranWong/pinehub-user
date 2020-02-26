import Service from '../Service';
import Echo from 'laravel-echo'
import th from "element-ui/src/locale/lang/th";

const io = require('weapp.socket.io');


export default class WebSocketService extends Service {
    _gateway = null;
    _connection = null;
    _userId = null;
    _privateChannel = null;
    _channel = null;

    constructor (application) {
        super(application);
        this._gateway = this.$application.config['app']['socket']['gateway'];
    }

    get connection () {
        return (async () => {
            let token = await this.service('mp.auth').getToken();
            this._connection = this._connection ? this._connection : new Echo({
                client: io,
                broadcaster: 'socket.io',
                host: this._gateway,
                disableStats: true,
                enabledTransports: ['ws', 'wss'],
                auth: {
                    headers: {
                        'AuthGuard': 'mp',
                        'Authorization': 'Bearer ' + token // getToken前端自行实现
                    }
                }
            });
            console.log(token, this._connection);
            return this._connection;
        })();
    }

    set userId (id) {
        this._userId = id;
        return id;
    }
    async privateChannel (type) {
        let connection = await this.connection;
        this._privateChannel = this._privateChannel ? this._privateChannel : connection.private(`${type}.${this._userId}.mp`);
        return this._privateChannel;
    }

    async channel (channel) {
        let connection = await this.connection;
        this._channel = this._channel ? this._channel : connection.channel(channel);
        return this._channel;
    }

    async notification (callback) {
        (await this.privateChannel('notification')).notification(callback);
    }

    async eventListener (channel, event, callback) {
        (await this.channel(channel)).listen(event, callback);
    }
}
