<template>
  <div style="height:100%;" >
    <van-search class="my-search" placeholder="搜索" v-model="value" show-action  @cancel="onCancel" background="#58ae33">
       <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <template >
      <my-scroll class="holePage"  ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="handlePull"  :get-scroll-top="getScrollTop" :slideState="slideState" :pageScrollState="pageScrollState">
        <div slot="scrollList">
            <div class="shops-box">
              <div class="shop" v-for="(item,index) in shopList" :key="index" @click="handleClickShop(item)">
                <img :src="item.image" alt="">
                <div class="name-main">
                  <p>{{item.title}}</p>
                  <span>{{item.type}}</span>
                  <div class="symbol-wrap">
                    <span v-if="item.discount==1" class="symbol discount">折扣</span>
                    <span v-if="item.discount==2" class="symbol subtraction">满减</span>
                  </div>
                </div>
                <div class="distance">{{item.dis}}</div>
              </div>
            </div>
        </div>
      </my-scroll>
      <div v-if="sto" class="sto icon iconfont icon-huidaodingbu" @click="handleToTop"></div>
    </template>
    
  </div>
</template>
<script>
import {shopLists} from "@model/index";
import {debounce,toTop} from "@util/request";
import myScroll from "@component/myScroll";
export default {
  data(){
    return{
      value:"",
      shopList:[],
      onFetching:false, //防止页面滑动时多次加载
      loadtext:"加载中...",
      sto:false,
      topFilter:false,
      selectFlag:0,
      page:{
        counter:1,  
        pageStart:1,  
        pageEnd:1,  
        total:10,
      },
      slideState:true,
      pageScrollState:true,
    };
  },
  components:{
    myScroll,
  },
  mounted(){
  },
  methods:{
    onCancel(){
      console.log(1);
    },
    onSearch(){

    },
    handleClickShop(obj){
      location.href=`detail.html?shopId=${obj.id}`;
    },
    handleToTop(){
      toTop();
      this.sto=false;
    },
    onRefresh(){
      this.$refs.myScroll.setState(3);
      this.getShopLists(1);
    },
    handlePull(){
      debounce(this.onPull(),500);
    },
    onPull(){
      let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if(wheight>100){
        this.sto=true;
      }else{
        this.sto=false;
      }
      if(this.page.counter<=this.page.total){
        setTimeout(async()=>{
          this.page.counter++;
          this.$refs.myScroll.setState(5);
          await this.getShopLists(this.page.counter);
        },500);
      }else{
        this.$refs.myScroll.setState(7);
      }
    },
    getScrollTop(){
      let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      return wheight;
    },
    async getShopLists(num){
      let rpromise=await shopLists({page:num});
      let res=rpromise.data;
      if(res.code===200){
        let arr=res.data.shopList.map(item=>{
          if(item.distance>=500){
            item.dis=(item.distance/1000).toFixed(1)+"km";
          }else{
            item.dis=item.distance.toFixed(1)+"m";
          }
          return item;
        });
        if(num==1){
          this.page={
            counter:1,  
            pageStart:1,  
            pageEnd:1,  
            total:10,
          };
          this.shopList=arr;
        }else{
          this.shopList=[...this.shopList,...arr];
        }
        
      }else{
        this.$toast.fail("fail");
      }
    },
  },
  created(){
    document.title="商户搜索";
  },
  watch:{
    topFilter(n){
      if(!n)this.selectFlag=0;
    },
  },
};
</script>
<style lang="scss">
  @import "./style.scss";
</style>

