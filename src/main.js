import Application from './Application';
import '../src/styles/weui.css';

const application = new Application(null, 'main');
if (typeof wx !== 'undefined') {
    wx['$app'] = application;
}
application.pageShow((page) => {
    let pages = getCurrentPages();
    let {options} = pages.pop();
    if (application.$route.stack.length) {
        let route = application.$route.stack[application.$route.stack.length - 1];
        if (route[0] !== page.routeAlias) {
            application.$route.stack.push([page.routeAlias, options]);
        }
    }
});

application.run(function () {
    console.log('%c ============================================== \n' +
        ' ||                                          || \n' +
        ' ||          MP VUE APPLICATION RUN          || \n' +
        ' ||                                          || \n' +
        ' ============================================== ',
        'background:#aaa;color:#bada55');
});

