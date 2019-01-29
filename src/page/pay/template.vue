<template>
    <div class="pay-container">
        <van-cell-group>
            <van-field
                v-model="total"
                required
                readonly
                label="订单总金额（元）"
                placeholder="请询问服务员后输入"
                @click="handleTotal"
            />
        </van-cell-group>
        <van-cell-group>
          <van-field
                v-model="outTotal"
                readonly
                label="不参与优惠金额（元）"
                placeholder="请询问服务员后输入"
                @click="handleOther"
            />
        </van-cell-group>
        <van-cell-group v-if="business||bank">
            <van-cell :value="bisamt"  v-if="business" >
                <template slot="title">
                    <span v-if="bis.type==1" class="symbol discount">折扣</span>
                    <span v-if="bis.type==2" class="symbol subtraction">满减</span>
                    <span class="van-cell-text">{{bis.info}}（商家优惠）</span>
                </template>
            </van-cell>
            <van-cell :value="bakamt" v-if="bank">
            <template  slot="title">
                <span v-if="bak.type==1" class="symbol discount">折扣</span>
                <span v-if="bak.type==2" class="symbol subtraction">满减</span>
                <span class="van-cell-text">{{bak.info}}（银行优惠）</span>
            </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group class="payamt" v-show="!!amt">
            <van-cell  title="支付金额（元）"  :value="amt"></van-cell>
        </van-cell-group>
        <div class="longbtn" @click="handlePay">已和店员确认，立即付款</div>
        <van-number-keyboard
            :show="show==1||show==2"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @input="onInput"
            @delete="onDelete"
            @close="onClose"
            :hide-on-click-outside="false"
            />
    </div>
</template>
<script>
import {GetRequest,changeTwoDecimal} from "@util/index";
import {shopDetails,calcDis} from "@model/index";
const tipText="计算中...";
export default {
  data(){
    return {
      shopId:"",
      show:0,
      amt:"",
      total:"",
      outTotal:"",
      business:false,
      bank:false,
      bisamt:"",
      bis:{
        type:1,
        info:"",
      },
      bakamt:"",
      bak:{
        type:2,
        info:"",
      },

    };
  },
  methods:{
    calcValue(oldNum,addNum){
      let reg=/(^[1-9]([0-9]{0,5})?(\.|(\.[0-9]{1,2}))?$)|(^(0){1}$)|(^[0-9](\.|(\.[0-9]([0-9])))?$)/;
      let newNum=oldNum+addNum;
      if(reg.test(newNum)){
        oldNum=newNum;
      }
      return oldNum;
    },
    handlePay(){

    },
    onInput(value){
      if(this.show==1){
        this.total=this.calcValue(this.total,value);
      }else{
        this.outTotal=this.calcValue(this.outTotal,value);
      }
    },
    onDelete(){
      if(this.show==1&&this.total.length>0){
        this.total=this.total.slice(0,this.total.length-1);
      }else if(this.show==2&&this.outTotal.length>0){
        this.outTotal=this.outTotal.slice(0,this.outTotal.length-1);
      }
    },
    async needCalc(){
      this.amt=tipText;
      this.bisamt=tipText;
      this.bakamt=tipText;
      const rpromise=await calcDis({shopId:this.shopId,total:this.total});
      const res=rpromise.data;
      if(res.code==200){
        this.bisamt=-changeTwoDecimal(res.data.bisamt)+"";
        this.bakamt=-changeTwoDecimal(res.data.bakamt)+"";
        let outTotal=this.outTotal?this.outTotal:0;
        this.amt=changeTwoDecimal((this.total*100+outTotal*100+this.bisamt*100+this.bakamt*100)/100)+"";
      }else{
        this.$toast.fail("fail");
      }
    },
    onClose(){
      if(this.show==1){
        this.show=0;
        if(this.total.endsWith(".")){
          this.total=this.total.slice(0,this.total.length-1);
        }
        if(this.total){
          this.needCalc();
        }else{
          this.total="";
          this.bisamt="";
          this.bakMat="";
          this.amt=this.outTotal;
        }
      }else{
        this.show=0;
        if(this.outTotal.endsWith(".")){
          this.outTotal=this.outTotal.slice(0,this.outTotal.length-1);
        }
        let total=this.total?this.total:0;
        let bisamt=this.bisamt?this.bisamt:0;
        let bakamt=this.bakamt?this.bakamt:0;
        if(!this.outTotal){
          this.outTotal=0;
          this.amt=changeTwoDecimal((total*100+this.outTotal*100+bisamt*100+bakamt*100)/100)+"";
          this.outTotal="";
        }else{
          this.amt=changeTwoDecimal((total*100+this.outTotal*100+bisamt*100+bakamt*100)/100)+""; 
        }
      }
    },
    async getShopInfo(){
      const rpromise=await shopDetails({shopId:this.shopId});
      const res=rpromise.data;
      if(res.code==200){
        for(let elem of res.data.disList.values()){
          if(elem.stateType=="商家优惠"){
            this.business=true;
            this.bis=elem;
          }else{
            this.bank=true;
            this.bak=elem;
          }
        }
      }else{
        this.$toast.fail("fail");
      }
    },
    handleTotal(){
      if(this.show==0){
        this.show=1;
      }
    },
    handleOther(){
      if(this.show==0){
        this.show=2;
      }
          
    },
  },
  created(){
    let obj=GetRequest();
    document.title=obj.shopName;
    this.shopId=obj.shopId;
    this.getShopInfo();
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>


