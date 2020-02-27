import Service from '../Service';
import Echo from 'laravel-echo'

const io = require('weapp.socket.io');


export default class WebSocketService extends Service {
    _gateway = null;
    _connection = null;

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

    async notification (userId, callback) {
        let connection = await this.connection;
        connection.private(`App.Models.User.${userId}`).notification(callback);
    }
}
