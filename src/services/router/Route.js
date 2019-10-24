export default class Route {
    constructor ({name, page, query, queryStr = ''}) {
        this.page = page;
        this.name = name;
        this.query = query;
        this.queryStr = queryStr
    }
    url () {
        return this.page + this.queryStr;
    }
}
