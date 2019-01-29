<template>
    <div class="bottom-line">
        <div class="title" ><slot  name="extrtext"></slot></div>
        <div class="line">
            <div :style="'background:'+lineColor"></div>
        </div>
    </div>
</template>
<script>
export default{
  name:"baseline",
  props:{
    lineColor:{
      default:"#bbb",
      type:String,
    },
  },
};
</script>
<style lang="scss" scope>
    @import "./style";
</style>
