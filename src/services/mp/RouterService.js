import Service from '../Service';
import _ from 'underscore';

export default class RouterService extends Service {
    constructor ($application) {
        super($application);
        this.$router = $application.$vm.prototype.$router;
        this.routes = $application.config['routes'];
        this.routeStack = [];
        this.currentRouter = '';
    }

    completed () {
        console.log('------- route completed --------');
    }
    push (route, options = {}) {
        console.log('---------- page -----------', route);
        if (this.currentRouter === route && this.routeStack.indexOf([route, options]) > -1) {
            return;
        }
        this.$application.currentRoute = route;
        this.routeStack.push([route, options]);
        this.currentRouter = route;
        let page = this.routes[route];
        options['path'] = page;
        this.$router.push(options, () => {
            this.completed();
        });
    }

    go (n) {
        this.$router.go(n);
    }

    replace (route, onCompleted = null, onAbort = null, onSuccess = null) {
        let page = this.routes[route];
        console.log('---------- page -----------', route);
        this.$application.currentRoute = route;
        let options = {};
        if (_.isArray(onCompleted) || _.isObject(onCompleted)) {
            options = onCompleted;
        } else {
            let completed = onCompleted;
            onCompleted = () => {
                completed && completed();
                this.completed();
            };
            onAbort = onAbort || function () {
            };
            onSuccess = onSuccess || function () {
            };
            options = {
                onCompleted: onCompleted,
                onAbort: onAbort,
                onSuccess: onSuccess
            };
        }
        console.log(options, onCompleted);
        if (typeof options['query'] !== 'undefined') {
            page += this.service('uri').query(options['query'])
        }
        console.log('---------- page -----------', page);
        this.$router.replace(page, options.onCompleted, options.onAbort, options.onSuccess);
    }

    back () {
        this.$router.back();
    }
}
