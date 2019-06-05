import Application from './Application';
console.log('---------- application bootstrap ----------');
const application = new Application(null, 'main');
if (typeof wx !== 'undefined') {
    wx['$app'] = application;
}
application.run(function () {
    console.log('%c ============================================== \n' +
        ' ||                                          || \n' +
        ' ||          MP VUE APPLICATION RUN          || \n' +
        ' ||                                          || \n' +
        ' ============================================== ',
        'background:#aaa;color:#bada55');
});
