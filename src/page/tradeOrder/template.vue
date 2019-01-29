<template>
    <div class="tradeOrder">
        <div class="trade-header">
            <div>
                <span class="icon iconfont icon-saoyisaojianjiban"></span>
                <p>扫一扫</p>
            </div>
            <div>
                <span class="icon iconfont icon-qrcode"></span>
                <p>付款码</p>
            </div>
        </div>
        <my-scroll  ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="handlePull"  :get-scroll-top="getScrollTop" :slideState="slideState" :pageScrollState="pageScrollState">
            <div slot="scrollList">
            <div class="oneMon" v-for="(item,index) in orderList" :key="index">
                <p class="order-ym">{{item.orderym}}</p>
                <ul class="order-wrap">
                    <li v-for="order in item.list" :key="order.orderNo" class="orderItem">
                        <img :src="order.logo" alt="logo">
                        <div class="info-st">
                            <p class="text-ellip">{{order.shopName}}</p>
                            <p class="info-time">{{order.dtime}}</p>
                        </div>
                        <p class="amt">{{order.amt}}</p>
                        <p v-if="order.stateType=='O'" class="state state1">{{order.stateName}}</p>
                        <p v-if="order.stateType=='S'" class="state state2">{{order.stateName}}</p>
                        <p v-if="order.stateType=='F'" class="state state3">{{order.stateName}}</p>
                    </li>
                </ul>
            </div>
            </div>
        </my-scroll>
        <div v-if="sto" class="sto icon iconfont icon-huidaodingbu" @click="handleToTop"></div>
    </div>
</template>
<script>
import {debounce,toTop} from "@util/request";
import myScroll from "@component/myScroll";
export default {
  data(){
    return {
      page:{
        counter:1,  
        pageStart:1,  
        pageEnd:1,  
        total:10,
      },
      slideState:true,
      pageScrollState:true,
      sto:false,
      orderList:[{
        orderym:"本月",
        list:[
          {
            orderNo:"pd789441qawrdfawfwav",
            logo:"",
            shopName:"测试用",
            dtime:"10/31 11:50",
            stateType:"S",
            amt:"-20.00",
            stateName:"支付成功",
          },
        ],

      }],
    };
  },
  components:{
    myScroll,
  },
  methods:{
    onRefresh(){
      this.$refs.myScroll.setState(3);
    },
    handlePull(){
      debounce(this.onPull(),500);
    },
    onPull(){

    },
    getScrollTop(){
      let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      return wheight;
    },
    handleToTop(){
      toTop();
      this.sto=false;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>

