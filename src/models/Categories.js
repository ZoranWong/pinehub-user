export default class Categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoriesTransformer;
  }
  computed() {
    
  }
  data() {
   
  }

  listeners() {
    super.listeners();
    
  }
}
