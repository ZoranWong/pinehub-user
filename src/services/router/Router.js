import _ from 'underscore'
import Route from './Route';
export default class Router {
    constructor (options) {
        this.routerAdapter = options['routerAdapter'];
        this.routes = options['routes'];
        this.app = options['application'];
        this.stack = [];
        this.currentRouter = '';
        this.currentRoute = null;
        let $router = this;
        Object.defineProperty(this, 'query', {
            get () {
                return $router.currentRoute ? $router.currentRoute.query : [];
            }
        })
    }

    addRoute (route) {
        this.routes[route.name] = route;
    }

    beforeEach (callback) {
    }

    beforeResolve () {
    }

    afterEach () {
    }

    push (route, query = {}) {
        if (this.stack.length && this.stack.length % 9 === 0) {
            this.reLaunch(route, query);
            return;
        }
        this.stack.push([route, query]);
        // _.map(this.stack, (stack) => {
        //     if (stack[0] !== route) {
        //         this.stack.push([route, query]);
        //     }
        // });
        let r = new Route(this.getRoute(route));
        this.app.currentRoute = route;
        this.app.changePage(r['page']);
        r.query = query;
        r.queryStr = this.app.uri.query(query);
        this.currentRoute = r;
        this.routerAdapter.push(r);
    }

    reLaunch (route, query = {}) {
        let r = new Route(this.getRoute(route));
        r.query = query;
        r.queryStr = this.app.uri.query(query);
        this.currentRoute = r;
        this.app.currentRoute = route;
        this.app.changePage(r['page']);
        this.routerAdapter.go(r);
    }

    getRoute (route) {
        return _.find(this.routes, function (r) {
            return route === r.name
        })
    }

    replace (route, query = {}) {
        let r = new Route(this.getRoute(route));
        r.query = query;
        r.queryStr = this.app.uri.query(query);
        this.currentRoute = r;
        this.app.currentRoute = route;
        this.app.changePage(r['page']);
        this.routerAdapter.replace(r);
    }

    go () {
    }

    back (query = {}) {
        this.stack.pop();
        this.routerAdapter.back()
    }

    forward () {
    }

    getMatchedComponents () {
    }

    resolve () {
    }

    addRoutes () {
    }

    onReady () {
    }

    onError () {
    }
}
