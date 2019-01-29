<template>
    <div style="padding-top:0.1rem">
       <van-cell-group>
         <van-cell title="订单总金额（元）" :value="total"></van-cell>
       </van-cell-group>
       <van-cell-group v-if="!!disList[0]">
         <van-cell v-for="(item,index) in disList" :key="index" :value="-item.amt">
           <template  slot="title">
                <span v-if="item.type==1" class="symbol discount">折扣</span>
              <span v-if="item.type==2" class="symbol subtraction">满减</span>
                <span class="van-cell-text">{{item.info}}（{{item.stateType}}）</span>
            </template>
         </van-cell>
       </van-cell-group>
       <van-cell-group>
         <van-cell title="支付金额（元）" :value="payAmt"></van-cell>
       </van-cell-group>
      <div class="longbtn" @click="handlePay">已和店员确认，立即付款</div>
    </div>
</template>
<script>
import {GetRequest,changeTwoDecimal} from "@util/index";
import {qutoPay} from "@model/index";
export default {
  data(){
    return{
      total:"",
      disList:[],
      payAmt:0,
    };
  },
  methods:{
    handlePay(){
      location.href="orderDetail.html?isSure=1";
    },
    async getInfo(){
      const rpromise=await qutoPay();
      const res=rpromise.data;
      if(res.code===200){
        let total=changeTwoDecimal(res.data.total);
        this.disList=res.data.disList.map(item=>{
          item.amt=changeTwoDecimal(item.amt);
          return item;
        });
        let totalDis=0;
        for(let item of this.disList.values()){ //遍历元素
          totalDis+=item.amt*100;
        }
        this.payAmt=changeTwoDecimal((total*100-totalDis)/100);
        this.total=total.toString();
        // document.title=res.data.shopName;
      }else{
        this.$toast.fail("fail");
      }
    },
  },
  mounted(){
    
  },
  created(){
    let obj=GetRequest();
    document.title=obj.shopName;
    this.getInfo();
    
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>


