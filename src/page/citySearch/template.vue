<template>
  <div  >
    <van-search class="my-search" placeholder="输入城市名称搜索" v-model="value" @input="onInput"  @cancel="onCancel" background="#58ae33">
    </van-search>
    <ul class="my-city-list">
      <li v-for="city in citys" :key="city.code" @click="handleClick(city)">{{city.name}}</li>
    </ul>
  </div>
</template>
<script>

export default {
  data(){
    return{
      value:"",
      citys:[
        {name:"北京",code:"13214321"},
      ],
    };
  },
  components:{
  },
  mounted(){
  },
  methods:{
    handleClick(obj){
      console.log(obj);
    },
    onCancel(){
      console.log(1);
    },
    onSearch(){

    },
    onInput(){
      console.log("input");
    },
    
  },
  created(){
    document.title="城市搜索";
  },
  watch:{
    
  },
};
</script>
<style lang="scss">
  @import "./style.scss";
</style>

