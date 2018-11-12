export default class Mock {
  constructor(application) {
    this.application = application;
  }
  async mock() {
    let data = this.data.apply(this, arguments);
    let result = this.application.instances['mock'].mock(data);
    // console.log(result)
    return result;
  }

  data() {
    return {

    };
  }
  mockMethod() {
    let args =  Array.apply(null, arguments);
    let method = args.shift();
    let Random = this.application.instances['mock'].Random;
    return () => {
      let data = Random[method].apply(Random, args)
      return data;
    };
  }
}
