<!-- <template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>Vuex counter：{{ count  + 2 }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
    <test></test>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import test from '@components/test'
export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  components:{
    'test':test,
  }
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
 -->

 <!-- <template>
  <div>
    <div>
      <ul class="tab ">
        <li v-for="(tab,index) in tabmsg" 
          :class="{cur:iscur==index}"
          @click="iscur=index,tabChange('tab' + (index + 1))">
          {{tab.tabtxt}}
        </li>
      </ul>
      
        <component v-bind:is="tabView"></component>
     
    </div>
  </div>

</template>

<script>

  import tab1 from '@/components/tab1'
  import tab2 from '@/components/tab2'
  import tab3 from '@/components/tab3'
  
  export default {
    data() {
      return {
        tabView: 'tab1', 
        tabmsg:[
          {tabtxt:'全部'},
          {tabtxt:'待付款'},
          {tabtxt:'待核销'}
        ],
        iscur : 0,
      }
    },
    components:{
      'tab1':tab1,
      'tab2':tab2,
      'tab3':tab3,
    },
    mounted() {

    },
    methods: {
      tabChange:function(tab){
        this.tabView = tab
      }
    }
  }
</script>
<style>
  .tab li{
    width: 33.33%;
    float: left;
    text-align: center;
    line-height: 50px;
  }
</style> -->