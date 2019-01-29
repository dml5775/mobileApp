<template>
  <div>
      <van-search class="my-search" placeholder="输入城市名称搜索(如北京)" v-model="value" @focus="onFocus"   background="#58ae33">
    </van-search>
    <div class="my-city-wrap">
        <p>当前城市</p>
        <span class="my-city">{{city}}</span>
    </div>
    <div>
        <div  v-for="item in cityIndexList" :key="item.index" id="item.index">
            <p class="index-p">{{item.index}}</p>
            <ul class="index-city-wrap">
                <li class="index-city"  v-for="city in item.list" :key="city.code" @click="handleClick(city)">{{city.name}}</li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      value:"",
      city:"北京",
      cityIndexList:[
        {
          index:"A",
          list:[{name:"阿坝",code:"123123"},{name:"安吉",code:"453352"}],
        },
      ],
    };
  },
  components:{
  },
  mounted(){
    
  },
  methods:{
    onFocus(){
      location.href="citySearch.html";
    },
    handleClick(obj){
      console.log(obj);
    },
  },
  created(){
    document.title="城市选择";
  },
  watch:{
  },
};
</script>
<style lang="scss">
  @import "./style.scss";
</style>

