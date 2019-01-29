<template>
  <div style="padding-bottom:0.86rem;">
      <van-swipe >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="de-img" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <section class="name-warp">
        <p>{{shopName}}</p>
        <p>{{shopType}}</p>
      </section>
      <section class="sundry-wrap">
        <p class="text-ellip" @click="handleAddress">
          <span class="icon iconfont icon-dizhi "></span>
          {{address}}
        </p>
        <p class="text-ellip" v-if="!!telText" @click="handleTel">
          <span class="icon iconfont icon-dianhua "></span>
          <span>电话:</span>
          <span>{{telText}}</span>
          <span class="call-btn">拨打</span>
        </p>
        <p class="text-ellip" v-if="!!timeText">
          <span class="icon iconfont icon-shijian "></span>
          <span>营业时间:</span>
          <span>{{timeText}}</span>
        </p>
      </section>
      <section v-if="!!disList[0]" class="discount-wrap">
        <div v-for="(item,index) in disList" :key="index" class="disInfo">
          <div class="symbol-wrap">
            <span v-if="item.type==1" class="symbol discount">折扣</span>
            <span v-if="item.type==2" class="symbol subtraction">满减</span>
          </div>
          
          <div class="de-info">
            <p :class="item.type==1?'ifText discount':'ifText subtraction'">{{item.info}}({{item.stateType}})</p>
            <p><span>{{item.start}}-{{item.end}},{{item.time}};</span><span v-if="!!item.count">{{item.count}};</span><span v-if="item.maxAmt">{{item.maxAmt}};</span><span v-if="item.limt">{{item.limt}}</span></p>
          </div>
        </div>
      </section>
      <section v-if="!!introText" class="intro-wrap">
        <p><span class="intro-start">商家简介：</span>{{introText}}</p>
      </section>
      <div class="footBtns">
        <div class="btn" @click="handleQrPay">扫码支付</div>
        |
        <div class="btn" @click="handlePay">付款</div>
      </div>
      <van-popup v-model="telShow" position="bottom" >
        <div class="my-tel-popup">
          <div class="tipTitle">选择要拨打的电话</div>
          <ul>
            <li v-for="num in tel" :key="num" @click="handleCall(num)">{{num}}</li>
          </ul>
          <div class="tel-cancel" @click="telShow=false">取消</div>
        </div>
        
      </van-popup>
  </div>
</template>
<script>
import {shopDetails}  from "@model/index";
import {GetRequest} from "@util/index";
export default {
  data(){
    return{
      telShow:false,
      shopId:"",
      images:[],
      shopName:"",
      shopType:"",
      introText:"",
      address:"",
      tel:[],
      telText:"",
      timeText:"上午9:00-晚上22:00",
      disList:[],
    };
  },
  components:{
  },
  mounted(){
    this.getDetails();
  },
  methods:{
    handleQrPay(){
      //扫码支付
      location.href=`quotaPay.html?shopName=${this.shopName}&shopId=${this.shopId}`;
    },
    handlePay(){
      //付款
      location.href=`pay.html?shopName=${this.shopName}&shopId=${this.shopId}`;
    },
    handleAddress(){
      location.href="map.html?lng=120.187214&lat=30.194076&shopName="+this.shopName;
    },
    handleCall(num){
      console.log(`调用app的打电话功能拨打${num}`);
    },
    handleTel(){
      if(this.tel.length===1){
        console.log("调用app的打电话功能");
      }else{
        this.telShow=true;
      }
    },
    async getDetails(){
      const rpromise=await shopDetails({shopId:this.shopId});
      const res=rpromise.data;
      if(res.code==200){
        this.images=res.data.images;
        this.shopName=res.data.shopName;
        this.shopType=res.data.shopType;
        this.introText=res.data.introText;
        this.address=res.data.address;
        this.tel=res.data.tel;
        this.telText=this.tel.join("，");
        this.disList=res.data.disList;
      }else{
        this.$toast.fail("fail");
      }
    },
    
  },
  created(){
    document.title="商户详情";
    this.shopId=GetRequest()["shopId"];
  },
  watch:{
    
  },
};
</script>
<style lang="scss">
  @import "./style.scss";
</style>

