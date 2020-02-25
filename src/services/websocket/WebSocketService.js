import Service from "../Service";
import Echo from 'laravel-echo'
const io = require('weapp.socket.io')

export default class WebSocketService extends Service {
    constructor (application) {
        super(application);
        console.log(application);
        this.gateway = this.$application.config['app']['socket']['gateway'];
        this.connection = new Echo({
            client: io,
            broadcaster: 'socket.io',
            host: this.gateway,
            disableStats: true,
            enabledTransports: ['ws', 'wss']
        });
    }

    onOpen () {

    }

    onMessage () {

    }

    onClose () {

    }
}
