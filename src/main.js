import Application from './Application';
const application = new Application(null, 'main');
if (typeof wx !== 'undefined') {
  wx['$app'] = application;
}
application.run(function () {
  console.log('run file name ========', __dirname,  __filename);
  console.log('%c ============================================== \n' +
                ' ||                                          || \n' +
                ' ||          MP VUE APPLICATION RUN          || \n' +
                ' ||                                          || \n' +
                ' ============================================== ',
    'background:#aaa;color:#bada55');
});
