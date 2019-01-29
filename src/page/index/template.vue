<template>
  <div style="height:100%;" >
    <div v-if="topFilter" class="mask" @click="topFilter=false;selectFlag=0"></div>
    <div  v-if="topFilter" class="filter-box-top">
      <div  class="filter-box ">
        <div class="o-cell" @click="handleFilter(1)">
          <p>{{content.className}}</p>
          <i v-if="selectFlag==1" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(2)">
          <p>{{content.areaName}}</p>
          <i v-if="selectFlag==2" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(3)">
          <p>{{content.sortName}}</p>
          <i v-if="selectFlag==3" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(4)">
          <p>{{content.filterName}}</p>
          <i v-if="selectFlag==4" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
      </div>
      <div id="optionsBox1"  class="optionsBox ">
        <ul class="first-ul">
          <li v-for="item in classList" :key="item.value" :class="{active:content._class==item.value}" @click="handleFirstClick(item)">{{item.name}}</li>
        </ul>
        <div v-if="!!childList[0]" class="second-ul">
          <ul>
            <li v-for="item in childList" :key="item.value" :class="{active:content.classValue==item.value}" @click="handleChildClick(item)">{{item.name}}</li>
          </ul>
        </div>
        
      </div>
      <div id="optionsBox2" class="optionsBox ">
        <ul class="first-ul">
          <li v-for="item in areaList" :key="item.value" :class="{active:content.areaValue==item.value}" @click="handleSecondClick(item)">{{item.name}}</li>
        </ul>
      </div>
      <div id="optionsBox3" class="optionsBox ">
        <ul class="first-ul">
          <li v-for="item in sortList" :key="item.value" :class="{active:content.sortValue==item.value}" @click="handleThirdClick(item)">{{item.name}}</li>
        </ul>
        
      </div>
      <div id="optionsBox4" class="optionsBox ">
        <ul class="first-ul">
          <li v-for="item in filterList" :key="item.value" :class="{active:content.filterValue==item.value}" @click="handleFourthClick(item)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <template v-if="!topFilter">
      <div class="search-head ">
        <p class="text-ellip" @click="handleClickCity"> <i class="icon iconfont icon-diliweizhi"></i>{{city}}</p>
          <van-search class="my-search" placeholder="搜索" v-model="value" @focus="handleGoToSearch" background="transparent" />
      </div>
      <div class="show-grid-8">
        <div v-for="(item,index) in showGridList" :key="index" class="show-grid-cell" @click="handleJump(item)">
          <i :class="item.iconClasses"></i>
          <p>{{item.name}}</p>
        </div>

        
      </div>
      <div class="filter-box">
        <div class="o-cell" @click="handleFilter(1)">
          <p>{{content.className}}</p>
          <i v-if="selectFlag==1" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(2)">
          <p>{{content.areaName}}</p>
          <i v-if="selectFlag==2" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(3)">
          <p>{{content.sortName}}</p>
          <i v-if="selectFlag==3" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
        |
        <div class="o-cell" @click="handleFilter(4)">
          <p>{{content.filterName}}</p>
          <i v-if="selectFlag==4" class="icon iconfont icon-xiaojiantou rotate180 color-viridity"></i>
          <i v-else class="icon iconfont icon-xiaojiantou"></i>
        </div>
      </div>
      <my-scroll  ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="handlePull"  :get-scroll-top="getScrollTop" :slideState="slideState" :pageScrollState="pageScrollState">
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
      <div v-if="sto&&!topFilter" class="sto icon iconfont icon-huidaodingbu" @click="handleToTop"></div>
    </template>
    
  </div>
</template>
<script>
import {shopLists,filterDatas} from "@model/index";
import {debounce,toTop} from "@util/request";
import myScroll from "@component/myScroll";
export default {
  data(){
    return{
      value:"",
      city:"北京",
      showGridList:[
        {
          iconClasses:"icon iconfont icon-repast ",
          name:"餐饮美食",
          value:"cyms",
        },
        {
          iconClasses:"icon iconfont icon-qiche ",
          name:"汽车服务",
          value:"qcfw",
        },
        {
          iconClasses:"icon iconfont icon-dianying ",
          name:"休闲娱乐",
          value:"xxyl",
        },
        {
          iconClasses:"icon iconfont icon-jiudian ",
          name:"酒店住宿",
          value:"jdzs",
        },
        {
          iconClasses:"icon iconfont icon-gouwu ",
          name:"购物百货",
          value:"gwbh",
        },
        {
          iconClasses:"icon iconfont icon-yiliao ",
          name:"医疗健康",
          value:"yljk",
        },
        {
          iconClasses:"icon iconfont icon-lvhangxiang ",
          name:"度假出行",
          value:"djcx",
        },
        {
          iconClasses:"icon iconfont icon-shenghuo1 ",
          name:"生活服务",
          value:"shfw",
        },
      ],
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
      content:{
        _class:"",
        className:"分类",
        classValue:"",
        areaName:"区域",
        areaValue:"",
        sortName:"排序",
        sortValue:"",
        filterName:"筛选",
        filterValue:"",
      },
      slideState:true,
      pageScrollState:true,
      childList:[],
    };
  },
  components:{
    myScroll,
  },
  mounted(){
    this.getSelectDatas();
  },
  methods:{
    handleClickCity(){
      location.href="city.html";
    },
    handleGoToSearch(){
      location.href="search.html";
    },
    handleJump(obj){
      location.href=`shop.html?title=${obj.name}&type=${obj.value}`;
    },
    handleClickShop(obj){
      location.href=`detail.html?shopId=${obj.id}`;
    },
    handleFirstClick(obj){
      this.content._class=obj.value;
      if(obj.value.slice(1,2)==0){
        this.content.className=obj.name;
        this.content.classValue=obj.value;
        this.getShopLists(1);
        this.topFilter=false;
      }else{
        this.childList=obj.children;
      }
    },
    handleChildClick(obj){
      this.content.className=obj.name;
      this.content.classValue=obj.value;
      this.shopList=[];
      this.getShopLists(1);
      this.topFilter=false;
    },
    handleSecondClick(obj){
      this.content.areaName=obj.name;
      this.content.areaValue=obj.value;
      this.shopList=[];
      this.getShopLists(1);
      this.topFilter=false;
    },
    handleThirdClick(obj){
      this.content.sortName=obj.name;
      this.content.sortValue=obj.value;
      this.shopList=[];
      this.getShopLists(1);
      this.topFilter=false;
    },
    handleFourthClick(obj){
      this.content.filterName=obj.name;
      this.content.filterValue=obj.value;
      this.shopList=[];
      this.getShopLists(1);
      this.topFilter=false;
    },
    handleFilter(ad){
      this.topFilter=true;
      this.selectFlag=ad;
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
    async getSelectDatas(){
      const rpromise=await filterDatas();
      const res=rpromise.data;
      if(res.code==200){
        this.classList=res.data.classList;
        this.areaList=res.data.areaList;
        this.sortList=res.data.sortList;
        this.filterList=res.data.filterList;
        this.content._class=this.classList[0].value;
        this.content.areaValue=this.areaList[0].value;
        this.content.sortValue=this.sortList[0].value;
        this.content.filterValue=this.filterList[0].value;
      }else{
        this.$toast.fail("fail");
      }
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
    document.title="移动商圈";
    this.getShopLists(1);
  },
  watch:{
    topFilter(n){
      if(!n)this.selectFlag=0;
    },
    selectFlag(newData,oldData){
      setTimeout(()=>{
        if(oldData>0){
          $("#optionsBox"+oldData).slideUp();
        }
        setTimeout(()=>{
          if(newData>0){
            $("#optionsBox"+newData).slideDown();
          }
        },300);
        
      },100);
      
    },
  },
};
</script>
<style lang="scss">
  @import "./style.scss";
</style>

