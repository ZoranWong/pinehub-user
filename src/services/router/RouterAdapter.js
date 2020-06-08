export default class RouterAdapter {
    constructor (router) {
        this.$router = router;
    }
    /*
    * @param {Route} route
    * */
    go (route) {
        // implements in child class
    }
    
    push (route) {
    
    }
    
    replace (route) {
    
    }
    
    back () {
    
    }
}
