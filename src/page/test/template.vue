<template>
    <div class="index">
        <my-scroll  ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="onPull"  :get-scroll-top="getTop" :slideState="slideState" :pageScrollState="pageScrollState">
        <div slot="scrollList">
            <ul>
                <li v-for="(x,index) in list" :key="index">列表{{index+1}}</li>
            </ul>
        </div>
        </my-scroll>
    </div>
</template>
<script type="text/javascript">
import myScroll from "@component/myScroll";
export default {
  data(){
    return{
      list:[],
      page:{
        counter:1,  
        pageStart:1,  
        pageEnd:1,  
        total:10,
      },
      pageScrollState:true,
      slideState:true,
    };
  },
  methods:{
    onRefresh(){ //刷新回调
      setTimeout(()=>{
        this.$refs.myScroll.setState(3);
        this.list=[];
        this.page={
          counter:1,  
          pageStart:1,  
          pageEnd:1,  
          total:10,
        };
        for(let i=0;i<1*50;i++){
          this.list.push({});
        }
      },500);
    },
    onPull(){ //加载回调
      if(this.page.counter<=this.page.total){
        setTimeout(()=>{
          this.page.counter++;
          console.log(this.page.counter);
          this.$refs.myScroll.setState(5);
          for(let i=0;i<10;i++){
            this.list.push({});
          }
        },500);
      }else{
        this.$refs.myScroll.setState(7);
      }
    },
    getTop() {//滚动条位置

    },

  },
  components:{
    myScroll,
  },
  created(){

  },
  mounted(){
    for(let i=0;i<1*50;i++){
      this.list.push({});
    }

  },

};
</script>
<style lang="scss" scoped>
    .index{
      overflow:hidden;
      height:100%;
    }
    li{
      height:50px;
    }
</style>