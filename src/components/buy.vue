<template>
  
</template>

<script>
import '../style/style.css';

export default {
  name: 'index',

  data () {
    return {
       
  
    }
  },
  created () {
    
    

 
  },
  mounted () {
    this.stop();
     
 },
  methods: {
  close:function(){
      this.$emit('child-event', false);
  },
     stop(){//禁止滑动限制
  document.body.style.overflow='hidden';

},
 
  
  },
  
    
 watch: {
     
 },
    

    computed: {

  
 
   
   
    },
    
}
</script>

<style scoped>
.main{
    position: fixed;
    top: 0;
    left: 0;
    width: 750px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.dislog{
    width: 600px;
    height: 436px;
    background: #FFFFFF;
    border-radius: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -218px 0 0 -300px;
}
.dislog-img{
    position: absolute;
    left: 124px;
    top: -100px;
    width: 272px;
    height: 244px;
}
.buy-text{

height: 50px;
font-size: 36px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 50px;
margin-top: 204px;
text-align: center;
}
.buy-title{
    
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #666666;
line-height: 40px;
text-align: center;
margin-top: 10px;
}
.buy-left{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 300px;
height: 72px;
background: #FFFFFF;
border-radius: 0px 0px 0 24px ;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 72px;
text-align: center;
}
.buy-right{
    position: absolute;
    right: 0;
    bottom: 0;
width: 300px;
height: 72px;
background: #FC5105;
border-radius: 0px 0px 24px 0px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;
line-height: 72px;
text-align: center;
}
</style>

