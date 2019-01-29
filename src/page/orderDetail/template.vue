<template>
    <div style="height:100%;">
        <div class="logo-wrap">
            <img :src="image" alt="logo">
            <h3>{{amt}}</h3>
            <p>交易成功</p>
        </div>
      <van-panel title="商户名称"  :status="shopName">
            <van-cell-group>
                <van-cell class="dis" title="订单金额（元）" :value="total" />
                <van-cell class="dis" v-if="!!businessPreferences " title="商家优惠（元）" :value="businessPreferences" />
                <van-cell class="dis" v-if="!!bankPreferences" title="银行优惠（元）" :value="bankPreferences" />
            </van-cell-group>
            <van-cell-group>
                <van-cell class="outDis" title="创建时间" :value="orderTime" />
                <van-cell class="outDis"  title="订单号" :value="orderNo" />
            </van-cell-group>
        
      </van-panel>
      <div v-if="isSure" class="longBtn">确定</div>
    </div>
</template>
<script>
import {GetRequest,changeTwoDecimal} from "@util/index";
import {orderDetails} from "@model/index";
export default {
  data(){
    return{
      isSure:true,
      image:"",
      amt:0,
      shopName:"",
      total:0,
      businessPreferences:0,
      bankPreferences:0,
      orderTime:"",
      orderNo:"",
    };
  },
  methods:{
    async getOrderDetails(){
      const rpromise=await orderDetails();
      const res=rpromise.data;
      if(res.code===200){
        this.image=res.data.image;
        this.total=changeTwoDecimal(res.data.total);
        this.businessPreferences=-changeTwoDecimal(res.data.businessPreferences);
        this.bankPreferences=-changeTwoDecimal(res.data.bankPreferences);
        this.amt=-changeTwoDecimal(res.data.amt);
        this.shopName=res.data.shopName;
        this.orderTime=res.data.orderTime;
        this.orderNo=res.data.orderNo;
        
      }else{
        this.$toast.fail("fail");
      }
    },
  },
  mounted(){
    
  },
  created(){
    document.title="订单详情";
    let obj=GetRequest();
    this.isSure=!!obj.isSure;
    this.getOrderDetails();
    
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>


