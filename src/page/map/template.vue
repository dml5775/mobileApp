<template>
    <div id="bmap" style="height:100%;"></div>
</template>
<script>
import {MP,GetRequest} from "@util/index";
export default {
  data(){
    return{
      lng:0,
      lat:0,
      shopName:"",
      ak:"MZE9gh2ekHL3MYQ61G9h3owBk8yjVGOh&callback=init",
    };
  },
  methods:{
    
  },
  mounted(){
    this.$nextTick(function(){
      let _this = this;
      MP(_this.ak).then(BMap => {
        let map = new BMap.Map("bmap");
        let point = new BMap.Point(this.lng, this.lat);

        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true);
        let marker = new BMap.Marker(new BMap.Point(this.lng, this.lat));
        map.addOverlay(marker);
        let label = new BMap.Label(this.shopName,{offset:new BMap.Size(20,-10)});
        marker.setLabel(label);
      });
    });
  },
  created(){
    let obj=GetRequest();
    this.lng=obj.lng;
    this.lat=obj.lat;
    this.shopName=obj.shopName;
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>


