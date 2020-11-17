<template>
  <div id="main" v-if="mainshow">
      <div class="nav-open" :class="isactive == true ? 'Fixed' :''" v-if="isappshow == true">
              <p class="opentext">打开创学了解更多优质课程</p>
              <p class="openclick" @click="isAppclick()">打开</p>
          </div>
      <div class="nav navigate__bar" v-show="searchBarFixed == true">
          <div class="nav-back" @click="backclick()">
              <i class="el-icon-arrow-left"></i>
          </div>
          <div class="nav-text">
              <ul :class="searchBarFixed == true ? 'isFixed' :''">
                  <li :class="{active: navIndex===0}" @click="scrollTo(0)">商品</li>
                  <li :class="{active: navIndex===1}" @click="scrollTo(1)">详情</li>
                  <li :class="{active: navIndex===2}" @click="scrollTo(2)">推荐</li>
                 
              </ul>
          </div>
           
      </div>
     <div class="top home__content_comp home__content_comp0" id="sp">
         <div id="container" class="swiper-wrapper">
               <swiper class="swiper" @slideChange="slideChange" :options="swiperOption" ref="mySwiper">
                   <swiper-slide class="swiper-slide" v-for="(item,index) in lbactive" :key="index">
                       <div class="slide-item">
                            <img :src="item" alt="">
                       </div>
                     
                    
                  </swiper-slide>
                 
            
                  <!-- <div class="swiper-button-prev" slot="button-prev"></div>
                 <div class="swiper-button-next" slot="button-next"></div> -->
                </swiper>   
            </div> 
               <div class="imageCount">{{current}}/{{currentnum}}</div>
        <div class="back"  @click="backclick()">
             <img src="../assets/coupon_icon_topbar_return.png" alt="">
         </div>
     </div>
     <div class="header" :class="{heaactive: couponPrice == 0}">
         <div class="header-con" :class="{heaactive1: couponPrice == 0}">
             <div class="con">
                <div class="header-text">
                   <p class="header-title">
                     <span class="header-title-icon">拼多多</span><span class="header-text-title">{{goodsName}}</span>
                     
                   </p>
                </div>
                <div class="header-info">
                    <div class="header-info-left">
                        <p><span class="money-icon">￥</span><span class="money-num">{{price}}</span><span class="money-text">券后</span></p>
                        <p class="price">原价：<s>￥{{originalPrice}}</s></p>
                    </div>
                    <div class="header-info-right">
                        <p class="sale">热销{{salesNum}}件</p>
                    </div>
                </div>
                <div class="header-Preferential" v-if=" couponPrice != 0">
                      <div class="Preferential-left">
                          <div class="Preferential-lefT-top">
                              <p class="Preferential-text">
                                优惠券
                              </p>
                              <p class="Preferential-title">
                                {{goodsName}}
                              </p>
                          </div>
                          <p class="Preferential-lefT-botm">
                              有效期：{{couponStartTime}}至{{couponEndTime}}
                          </p>
                      </div>
                      <div class="Preferential-right" v-if="thisapp == false"  @click="buyclick()" >
                          <p class="Preferential-right-top"><span class="Preferential-right-num">{{couponPrice}}</span><span>元</span></p>
                          <p class="Preferential-right-botm">领取</p>
                      </div>
                      <a :href="hreflj"  v-else>
                      <div class="Preferential-right">
                          <p class="Preferential-right-top"><span class="Preferential-right-num">{{couponPrice}}</span><span>元</span></p>
                          <p class="Preferential-right-botm">领取</p>
                      </div>
                      </a>
                    
                      
                </div>
             </div>
            
         </div>

     </div>
     <div class="Experience">
         <div class="con">
             <p class="Experience-text">良品铺子</p>
             <p class="Experience-icon">拼多多</p>
         
             <ul class="Experience-img">
                 <li>宝贝描述：<span>{{descTxt}}</span></li>
                 <li>商家服务：<span>{{servTxt}}</span></li>
                 <li>物流服务：<span>{{lgstTxt}}</span></li>
                
             </ul>
         </div>
     </div>
     <div class="commodity home-comp home__content_comp home__content_comp1" id="xq">
         <div class="con">
              <p class="commodity-text">
                  商品详情
              </p>
              <p class="xian"></p>
              <img :src="item" v-for="(item,index) in xqactive" :key="index" class="sp-img" alt="">
         </div> 
     </div>
      <div class="commodity home__content_comp home__content_comp2" id="tj" style=" margin-bottom: 60px;">
         <div class="con">
              <p class="commodity-text">
                  为您推荐
              </p>
              <p class="xian"></p>
              <ul class="recommend">
                  <li v-for="(item,index) in active" @click="tjclick(index)" :key="index">
                      <a href="#">

                      <div class="recommend-left">
                          <img :src="item.goodsImg" class="recommend-img" alt="">
                      </div>
                      <div class="recommend-right">
                          <p class="recommend-title">
                              <span class="recommend-title-icon">拼多多</span><span class="recommend-text-title">{{item.goodsName}}</span>
                     
                          </p>
                           <p class="recommend-money"><span class="money-icon">￥</span><span class="money-num">{{item.price}}</span><span class="money-text">券后</span></p>
                           <p class="backmoney">返现¥{{item.rePrice.toString().slice(0,4)}}</p>
                           <p class="price">原价：<s>￥{{item.originalPrice}}</s></p>
                      </div>
                      </a>

                  </li>
                 
              </ul>
         </div>
     </div>
     <div class="foot">
         <img src="../assets/coupon_icon_details_collect_none.png" @click="collclick()" v-if="state == 0" class="collection" alt="">
         <img src="../assets/coupon_icon_details_collect_sel.png" @click="collclick()" v-else class="collection" alt="">
         <div class="foot-right">
             <div class="share" @click="shareclick()">
                 <p class="share-text">分享</p>
                 <p class="share-num">赚{{sharePrice}}元</p> 
             </div>
             <div class="buy" @click="buyclick()" v-if="thisapp == false">
                   <p class="share-text">购买</p>
            
                 <p class="share-num">返现{{rePrice}}元</p> 
             </div>
              <a :href="hreflj" v-else>
              <div class="buy">
                   <p class="share-text">购买</p>
                 <p class="share-num">返现{{rePrice}}元</p> 
             </div>
             </a>
             
         </div>
     </div>
     <div>
        <div class="main" v-if="advertising">
      <div class="dislog">
        <img src="../assets/coupon_icon_details_tips.png" class="dislog-img" alt="">
        <p class="buy-text">购买提示</p>
        <p class="buy-title"> 非app内购买无法获得购买返现</p>
        <p class="buy-left" @click="isAppclick()">APP内购买</p>
        <a :href="hreflj">
           <p class="buy-right" >继续购买</p>
        </a>
       
      </div>
  </div>
      </div>
      <div class="message" v-show="messhow == true">
          {{mes}}
      </div>
  </div>
</template>

<script>
import prompt from '@/components/buy';
import '../style/style.css';
import { Swiper, swiperSlide } from 'vue-awesome-swiper'
import UA from "ua-device";
export default {
  name: 'index',
components: {
   Swiper,
   prompt
  },
  data () {
    return {
        swiperOption: {
    //   autoplay : {
    // 	disableOnInteraction: true, //用户操作后是否禁止自动循环
   	// 	delay: 2000 //自自动循环时间
  	//   }, //可选选项，自动滑动
   	speed: 1500, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
    loop:false, //循环切换
    //  spaceBetween: '5%',
    slidesPerView: 1,
         //  appendNumber:4,
    paginationClickable: true,
    spaceBetween: 17,
   	 grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
  	 //setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
     autoHeight: true,   //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。  
  //   autoWidth: '80%',   //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。 
  	 scrollbar: '.swiper-scrollbar',
  	 mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
  	 observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper

   	pagination: {
    	el: '.swiper-pagination',
    	// type : 'progressbar', //分页器形状
    	clickable :true, //点击分页器的指示点分页器会控制Swiper切换
       },
       navigation: {
   	 nextEl: '.swiper-button-next',
   	 prevEl: '.swiper-button-prev',
       }, 
        // on:{
        //     slideChange:function(){
        //       vm.current = this.activeIndex + 1
        //     }
        //   },
  	   
   }   ,
   thisapp:'',
   mainshow:true,
    type:'',  
    isappshow:false,
    current:'1',
    currentnum:'10',
    navIndex:0,
    searchBarFixed:false,
    isactive:false,
    advertising:false,
    id:'',
    shareId:'',
    az:'',
    sharedata:'',
    active:[],
    lbactive:{}, //轮播图
    xqactive:{}, //详情页
    goodsName:'',
    price:'',
    originalPrice:'',
    salesNum:'',
    couponPrice:'',
    couponStartTime:'',
    couponEndTime:'',
    rePrice:'',
    goodsImg:'',
    sharePrice:'',
    state:'',  //收藏状态
    goodsId:'',
    token:'',
    descTxt:'',
    servTxt:'',
    lgstTxt:'',
    mes:'',
    messhow:'',
    hreflj:'',
    usercode:''
    }
  },
  created () {
    //this.checkCookie();
    let _url = this.$route.fullPath.indexOf('id')
  //  console.log(_url)
    // if (_url == -1) {
    //     this.mainshow = false

    // } else {
    //     this.mainshow = true
    // }
    // console.log(_url);
    this.goodsId = this.$route.query.id
    this.set();
    this.get();

  
 
  },
  mounted () {

      
      this.shareId =this.$route.query.Id


      //this.az = 'chuangxue://path?'+'id'
    //  alert(this.id,this.shareId)
      this.coupon();
      this.getCate();
      this.collection();
      this.isApp();
      this.buygoods();
      this.appnw();
      //this.getCookie();
  window.addEventListener('scroll', this.menu)
       if (window.history && window.history.pushState) {
       // 往历史记录里面添加一条新的当前页面的url
       history.pushState(null, null, document.URL);
       // 给 popstate 绑定一个方法 监听页面刷新
       window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
       }
     
 },
  methods: {
      parentEvent(data){
    
      this.advertising = data
      document.body.style.overflow='';
     // this.state = '3'
    },
    backChange() {
       let that = this;
       window.close();
       //alert("监听到了");
       history.pushState(null, null, document.URL);
     
       

      },
      
  slideChange: function () {
    var that = this;
   // console.log(this.$refs.mySwiper.swiperInstance.activeIndex)
    this.current = this.$refs.mySwiper.swiperInstance.activeIndex+1
   // console.log(1)
    //this.$refs.mySwiper.Swiper.activeIndex
    // if (e.detail.source == 'touch') {
    //   that.current= e.detail.current + 1
    // }
  }, 
  scrollTo(index) {
        // 获取目标的 offsetTop
        // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
        // const foundEl = document.querySelector(`.home__content_comp div:nth-child(${index + 1})`);
        // const elClientHeight = foundEl.clientHeight;
      //  console.log(document.querySelector(`.home__content_comp(${index+1})`))
      //  console.log(document.querySelector('.home__content_comp'+ index))
        const targetOffsetTop = document.querySelector('.home__content_comp'+ index).offsetTop+1
        //console.log(targetOffsetTop)
        // 获取当前 offsetTop
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      //  console.log(scrollTop)
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
        const STEP = 50
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
        //    console.log(111)
            // 往上滑
            smoothUp()
        } else {
            // 往下滑
            smoothDown()
        }
        // 定义往下滑函数
        function smoothDown() {
            // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
            if (scrollTop < targetOffsetTop) {
                // 如果和目标相差距离大于等于 STEP 就跳 STEP
                // 否则直接跳到目标点，目标是为了防止跳过了。
                if (targetOffsetTop - scrollTop >= STEP) {
                    scrollTop += STEP
                } else {
                    scrollTop = targetOffsetTop
                }
                document.body.scrollTop = scrollTop
                document.documentElement.scrollTop = scrollTop
                // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                requestAnimationFrame(smoothDown)
            }
        }
        // 定义往上滑函数
        function smoothUp() {
            if (scrollTop > targetOffsetTop) {
                if (scrollTop - targetOffsetTop >= STEP) {
                    scrollTop -= STEP
                } else {
                    scrollTop = targetOffsetTop
                }
                document.body.scrollTop = scrollTop
                document.documentElement.scrollTop = scrollTop
                requestAnimationFrame(smoothUp)
            }
        }
    },
  menu() {
         const navContents = document.querySelectorAll('.home__content_comp')
          // console.log(navContents.length)
           // 所有锚点元素的 offsetTop
           const offsetTopArr = []
           navContents.forEach(item => {
               offsetTopArr.push(item.offsetTop)
           })
           // 获取当前文档流的 scrollTop
           const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
           // 定义当前点亮的导航下标
           let navIndex = 0
           for (let n = 0; n < offsetTopArr.length; n++) {
               // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
               // 那么此时导航索引就应该是n了
               if (scrollTop >=offsetTopArr[n]) {
                   navIndex = n
               }
           }
           navIndex = navIndex >= navContents.length? navIndex-1:navIndex;
        //   console.log(navIndex)
           this.navIndex = navIndex

           // 组件吸附顶部
           var offsetTop = document.querySelector('.navigate__bar').offsetTop +1;
           if (scrollTop > offsetTop) {
               this.searchBarFixed = true;
               this.isactive = true;
           } else {
               this.searchBarFixed = false;
               this.isactive = false;
           }
      },
      isApp(){
        var inMyApp = navigator.userAgent.indexOf('chuangxue')
            // console.log(inMyApp)
        if ( inMyApp != -1 ){
             this.isappshow = false
          //  console.log( "Yes, Version"); //在APP内
            //Yes, Version:2.0
         } else {
            this.isappshow = true
           // console.log( "No" ); //不在APP内
            //No
        }
},
isAppclick:function(){
        const u = navigator.userAgent;
     //   const ua = window.navigator.userAgent.toLowerCase();
       // console.log(ua.match(/chuangxue/i))
	    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isiOS) {
              //  if(ua.match(/chuangxue/i) == 'chuangxue'){
                 window.location.href = 'https://iostest.zjchuangxue.com?id='+ this.goodsId + '&shareId=' + this.shareId
               // } else {
                    setTimeout(() => {
                    window.location = "https://apps.apple.com/cn/app/%E5%88%9B%E5%AD%A6/id1474772079";//ios下载地址
                 }, 1000)
            //    }
               
               
			//	return "ios";
			} else {
              //  alert(andior)
              //  if(ua.match(/chuangxue/i) == 'chuangxue'){
                 window.location.href = 'chuangxue://path?id='+ this.goodsId + '&shareId=' + this.shareId
            //    } else {
                  setTimeout(() => {
                    window.location = "https://sj.qq.com/myapp/detail.htm?apkName=com.nb.cx";//安卓下载地址
                 }, 1000)
             //   }
              //  window.location.href = 'chuangxue://path?id=196'
                
			//	return "andriod";
			}
  //  console.log(1)
     
},
getCate:function(){
 this.$axios.get("/consumer/coupon-category/getCate",{

     })
    .then(res=>{
    //  console.log(res,888)
       let types = res.data.data
       let type =  Math.floor((Math.random()*types.length));
       this.type = types[type].type
       this.tjpon();
     //  console.log(type,77)
    })
},
coupon:function (){
       this.$axios.get("/consumer/coupon-goods/goodsDetail",{
            params:{
             goodsId:this.goodsId,
            }
     })
    .then(res=>{
      //  console.log(res,888)
        this.goodsName = res.data.data[0].goodsName
        this.price = res.data.data[0].price
        this.originalPrice = res.data.data[0].originalPrice
        this.salesNum = res.data.data[0].salesNum
        this.couponPrice = res.data.data[0].couponPrice
        let couponStartTime = res.data.data[0].couponStartTime
        let couponEndTime = res.data.data[0].couponEndTime
       // console.log(res.data.data[0].rePrice,3)
        this.descTxt = res.data.data[0].descTxt
        this.servTxt = res.data.data[0].servTxt
        this.lgstTxt = res.data.data[0].lgstTxt
        this.rePrice = res.data.data[0].rePrice.toString().slice(0,4)
        this.goodsImg = res.data.data[0].goodsImg
        this.sharePrice = res.data.data[0].sharePrice.toString().slice(0,4)
        let _len = res.data.data[0].imgUrl

        var StartTime = new Date(couponStartTime*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = StartTime.getFullYear()
        var M = (StartTime.getMonth()+1 < 10 ? '0'+(StartTime.getMonth()+1) : StartTime.getMonth()+1)
        var D = (StartTime.getDate() < 10 ? '0'+(StartTime.getDate()) : StartTime.getDate())
        this.couponStartTime = Y +'年' + M +'月'+ D +'日'
        var EndTime = new Date(couponEndTime*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var endY = EndTime.getFullYear()
        var endM = (EndTime.getMonth()+1 < 10 ? '0'+(EndTime.getMonth()+1) : EndTime.getMonth()+1)
        var endD = (EndTime.getDate() < 10 ? '0'+(EndTime.getDate()) : EndTime.getDate())
        this.couponStartTime = Y +'年' + M +'月'+ D +'日'
        this.couponEndTime = endY +'年' + endM +'月'+ endD +'日'
       // console.log(Y,M,D)

        //this.currentnum = res.data.data[0].imgUrl.length
        if (this.currentnum <= 5){
            this.lbactive = _len
            this.currentnum = res.data.data[0].imgUrl.length
            this.xqactive = _len
        } else {
          this.lbactive = _len.slice(0,5)
          this.currentnum = 5
          this.xqactive = _len.slice(5)
        }
       // console.log(this.lbactive)
      //  this.slide = res.data.data
       // console.log(res.data.data,8888)
      
    })
},
buygoods:function(){
    this.$axios.get("/consumer/coupon-goods/buyGoods",{
        headers: {
           token:this.token, // localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976'//
           userCode:this.usercode
        },
            params:{
             goodsId:this.goodsId,
            }
     })
    .then(res=>{
     //   console.log(res)
         this.hreflj = res.data.data  
    })
},
tjpon:function (){
       this.$axios.get("/consumer/coupon-goods/getGoods",{
        
            params:{
             offset:'1',
             limit:'10',
             category:this.type
            }
     })
    .then(res=>{
       // console.log(res,989)
        this.active = res.data.data
    })
},
collection:function(){
       this.$axios.get("/consumer/coupon-cart/cartType",{
        headers: {
           token:this.token, // localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976'//
           userCode:this.usercode
        },
            params:{
             goodsId:this.goodsId,
             
            }
     })
    .then(res=>{
  //   console.log(res)
        this.state = res.data.data
    })
},
collclick:function(){
    console.log(this.token)
       this.$axios.post("/consumer/coupon-cart/changeCart",{
             goodsId:this.goodsId,
             
             goodsName:this.goodsName,
             originalPrice:this.originalPrice,
             price:this.price,
             salesNum:this.salesNum,
             rePrice:this.rePrice,
             goodsImg:this.goodsImg,
       },{
            headers: {
           token:this.token, // localStorage.getItem('_token') //'cc349aa7d6c748ffaf229cac4f96c976'//
           userCode:this.usercode,
    

       },
            params:{
           type:this.state,
             
            }

       

     })
    .then(res=>{
        console.log(res)
         this.collection();
      //   window.addEventListener('scroll', this.scrollToTop,true)
         this.mes = res.data.data
         this.messhow = true
         if(this.messhow == true){
              setTimeout(() => {
                this.messhow = false
            }, 1000)
         }
       
    })
},
// backTop () {
//       const that = this
//       let timer = setInterval(() => {
//         let ispeed = Math.floor(-that.scrollTop / 5)
//         document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
//         if (that.scrollTop === 0) {
//           clearInterval(timer)
//         }
//       }, 16)
//   },

//   // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
//   scrollToTop () {
//     const that = this
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
//     that.scrollTop = scrollTop
//     if (that.scrollTop > 60) {
//       that.btnFlag = true
//     } else {
//       that.btnFlag = false
//     }
//   },
tjclick:function(index){
    this.goodsId = this.active[index].goodsId
    //console.log(this.goodsId)
    this.coupon()
    this.getCate()
},
openApp:function (){
	var ua = window.navigator.userAgent.toLowerCase();
	//微信
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    	window.location.href='downLoadForPhone';
    }else{//非微信浏览器
    	if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    	    var loadDateTime = new Date();
    	    window.setTimeout(function() {
    	    	var timeOutDateTime = new Date();
    	    	if (timeOutDateTime - loadDateTime < 5000) {
    	    		window.location = "";//ios下载地址
    	    	} else {
    	        window.close();
    	    	}
    	    },2000);
    	    window.location = "schema://";
    	  }else if (navigator.userAgent.match(/android/i)) {
    	    var state = null;
    	    try {
    	    	window.location = 'schema://';
    	    	setTimeout(function(){
    				window.location= ""; //android下载地址
 
    			},500);
    	    } catch(e) {}
	    }
    }

},
  set: function (name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
   // alert(window.document.cookie)
    if(window.document.cookie.indexOf('token') == -1){
       
    } else {
        let _token = window.document.cookie.split(',')
        //alert(_token)
        let tokens = _token[0].split('token=')
        this.token = tokens[1]
        let usercodes = _token[1].split('userCode=')
        this.usercode = usercodes[1]
         // alert(this.token)
    }
  
},
get: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
   // alert(v,11)
    return v ? v[2] : null;
},
delete: function (name) {
    this.set(name, '', -1);
},

buyclick:function(){
    var inMyApp = navigator.userAgent.indexOf('chuangxue')
            // console.log(inMyApp)
        if ( inMyApp != -1 ){
           
           // console.log(111)
           //  this.isappshow = false
          //  console.log( "Yes, Version"); //在APP内
            //Yes, Version:2.0
         } else {
            // console.log(11)
            this.advertising = true
           // console.log( "No" ); //不在APP内
            //No
        }

},
appnw:function(){
    var inMyApp = navigator.userAgent.indexOf('chuangxue')
            // console.log(inMyApp)
        if ( inMyApp != -1 ){
          //  console.log(1)
           this.thisapp = true
           // console.log(111)
           //  this.isappshow = false
          //  console.log( "Yes, Version"); //在APP内
            //Yes, Version:2.0
         } else {
             console.log(2)
            // console.log(11)
            this.thisapp = false
           // console.log( "No" ); //不在APP内
            //No
        }

},
backclick:function(){
    this.$bridge.callhandler('getbackProfit', (data) => {
         // alert(321)
  // 处理返回数据
        })
},
shareclick:function(){
    this.sharedata = {
        img:this.goodsImg,
        desc:this.goodsName,
    }
   // console.log(this.sharedata)
    this.$bridge.callhandler('shareDialog',this.sharedata, (data) => {
         // alert(321)
  // 处理返回数据
        })
}
  
  
  
  },
  
    
 watch: {
     
 },
    

    computed: {
           swiper() {
   return this.$refs.mySwiper.swiper
  }
  
 
   
   
    },
     destroy() {
            // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
            window.removeEventListener('scroll',  this.menu)
        },
    destroyed(){
      window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
    },
}
</script>

<style scoped>
.heaactive{
    height: 210px !important;
}
.heaactive1{
    height: 230px !important;
}
.Fixed{
    top: 88px !important;
}
.nav-open{
    height: 90px;
    width: 750px;
    font-size-adjust: 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 444;
    color: #000;
    background: #fff;
}
.opentext{
   
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #333333;
line-height: 40px;
float: left;
margin-top: 25px;
margin-left: 20px;
}
.openclick{
    float: right;
    width: 160px;
    height: 52px;
    background: #1677FF;
   border-radius: 8px;
   text-align: center;
font-size: 28px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FFFFFF;
line-height: 52px;
margin-top: 19px;
margin-right: 19px;
}
.searchBar {
            width: 100%;
            }
	   .searchBar .isFixed {
	            position: fixed;
	            width: 100%;
	            top: 0;
	            left: 0;
                z-index: 999;
         
	        }
	   .searchBar     ul {
	            height: 40px;
	            line-height: 40px;
	            display: flex;
	            margin:0;
	            padding: 0;
            }
	     .searchBar       li {
	                font-size: 0.8rem;
	                flex: 1;
	                display: flex;
	                justify-items: center;
	                justify-content: center;
	                align-items: center;
	                align-content: center;
	                position: relative;
                    background-color: #fff;
                }
                .active{
                     color: #EE1400 !important;
                     border-bottom: 1px solid #EE1400;
                     line-height: 65px;
                }
	                /* &.active {
	                    color: #847ec3;
                        background-color: #e2e2e2;
                    }
	                    &:after {
	                        content: " ";
	                        position: absolute;
	                        height: 1px;
	                        width: 30px;
	                        bottom: 6px;
	                        left:calc(50% - 15px);
	                        border-top: 2px #847ec3 solid;
	                    } */
	         
	    
.nav-text{
    width: 315px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
}
.nav-text ul{
    width: 400px;
   
}
.nav-text ul li{
   width: 65px;
   float: left;
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #000;
line-height: 45px;
margin-right: 60px;
}
.nav{
    width: 750px;
    height: 88px;
    position: fixed;
    z-index: 333;
    top: 0;
    left: 0;
    background: #fff;
}
.nav-back{
    width: 18px;
    height: 32px;
    position: absolute;
     top:34px;
    left: 20px;
    font-size: 32px;
}
#main{
   
    width: 750px;
    height: 2500px;
    background: #F5F5F5;
    position: relative;
}
.top{
    width: 750px;
    height: 750px;
    position: relative;
}
.back{
    width: 40px;
    height: 40px;
    position: absolute;
    top:34px;
    left: 20px;
    height: 64px;
    z-index: 1;
}
.back img{
    width: 40px;
    height: 40px;
}
.swiper-wrapper{
    position: relative;
}
.swiper-slide {
        width: 750px;
        height: 750px;
        text-align: center;
        font-size: 18px;
        background: #fff;
        
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;

    }
    .swiper-slide img{
        width: 750px;
        height: 750px;
    }
    .imageCount{
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        width: 100px;
        height: 48px;
        position: absolute;
        bottom: 50px;
        right: 20px;
        z-index: 222;
        font-size: 26px;
        line-height: 48px;
        text-align: center;
        border-radius: 24px;
    }
.header{
    width: 750px;
    height: 387px;
    position: relative;
    margin-bottom: 14px;
}
.header-con{
    width: 750px;
    height: 413px;
    position: absolute;
    top: -24px;
    background: #FFFFFF;
    border-radius: 24px 24px 0px 0px; 
    z-index: 3;
}
.con{
    width: 710px;
    margin: 0 auto;
}
.header-title{
    height: 90px;

    margin-top: 20px;
    margin-bottom: 20px;
}
.header-title-icon{
    width: 100px;
    height: 45px;
    background: #ED291E;
    text-align: center;
    line-height: 45px;
    display: inline-block;
    border-radius: 18px;
    color: #fff;
    margin-right: 10px;
}
.header-text-title{
    
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 45px;
margin-top: 3px;


}
.header-info-left{
    float: left;
}
.money-icon{
    
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #EE1400;
line-height: 40px;
}
.money-num{
    
height: 59px;
font-size: 48px;
font-family: DIN-Bold, DIN;
font-weight: bold;
color: #EE1400;
line-height: 59px;
}
.money-text{

    
    border-radius: 24px;
    width: 52px;
height: 24px;
background: #EE1400;
line-height: 24px;
color: #fff;
display: inline-block;
font-size: 16px;
text-align: center;
margin-left: 10px;

}
.price{
    
height: 30px;
font-size: 22px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #333333;
line-height: 30px;
}
.header-info-right{
    float: right;
}
.sale{
    
height: 30px;
font-size: 22px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #999999;
line-height: 30px;
margin-top: 50px;
}
.header-Preferential{
    clear: both;
    width: 734px;
    height: 177px;
    background: url(../assets/coupon_icon_details_coupon.png) no-repeat;
    background-size: 100%;
    margin-left: -10px;
    margin-top: 10px;
}
.Preferential-left{
    float: left;
    margin: 40px 0 0 30px;
}

.Preferential-right{
    float: right;
}
.Preferential-text{
    float: left;
    width: 72px;
height: 40px;
line-height: 40px;
text-align: center;
background: #EE1400;
border-radius: 6px;
font-size: 18px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;

}
.Preferential-title{
    float: left;
    width: 300px;
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 40px;
white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        margin-left: 10px;
}
.Preferential-lefT-botm{
    clear: both;
height: 33px;
font-size: 24px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #333333;
line-height: 33px;
padding-top: 20px;
}
.Preferential-right-top{
    text-align: center;
    color: #EE1400;
    font-size: 20px;
    margin: 30px 24px 0  0;
}
.Preferential-right-num{
    font-size: 36px;
    font-weight: bold;
}
.Preferential-right-botm{
    width: 110px;
height: 44px;
background: #EE1400;
border-radius: 22px;
color: #fff;
line-height: 44px;
text-align: center;
font-size: 22px;
margin: 15px 25px 0 0;

}
.Experience{
    width: 750px;
    height: 128px;
    background: #fff;
    margin-bottom: 14px;
}
.Experience-text{
    float: left;
    
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 45px;
margin-top: 20px;
}
.Experience-icon{
    float: left;
    width: 100px;
height: 36px;
line-height: 36px;
background: #ED291E;
border-radius: 18px;
text-align: center;
font-size: 22px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;
margin-left: 10px;
margin-top: 25px;
}
.Experience-title{
    clear: both;
    
height: 33px;
font-size: 24px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #999999;
line-height: 33px;
float: left;
margin-top: 10px;
margin-right: 20px;
}
.Experience-img {
    clear: both;
    margin-top: 13px;
}
.Experience-img li{
    float: left;
    margin-right: 60px;
    
font-size: 24px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #999999;
line-height: 33px;
}
.Experience-img li span{

color: #ED291E;

}
.Experience-img li img{
    width: 24px;
    height: 24px;
}
.commodity{
    width: 750px;
    min-height: 100px;
    background: #fff;
    margin-bottom: 14px;
    margin-top: 14px;
}
.commodity-text{
    
height: 45px;
font-size: 32px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 45px;
padding-top: 88px;
margin-top: -88px;
}
.xian{
    width: 710px;
height: 1px;
background: #F0F0F0;
margin-top: 20px;
margin-bottom: 20px;
}
.sp-img{
    width: 710px;
    height: 100%;
    margin-bottom: 20px;
}
.recommend li {
    height: 200px;
    padding-bottom: 30px;
}
.recommend-left{
    float: left;
}
.recommend-right{
    float: left;
    width: 490px;
    margin-left: 20px;
    margin-top: 10px;
}
.recommend-img{
    width: 200px;
    height: 200px;

}
.recommend-title{
    position: relative;
    width: 490px;
}
.recommend-title-icon{
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    text-align: center;
    line-height: 36px;
    display: inline-block;
height: 36px;
background: #ED291E;
border-radius: 18px;
font-size: 22px;
color: #fff;
}
.recommend-text-title{
    width: 490px;
    display: inline-block;
    overflow: hidden;
    height: 80px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #333333;
line-height: 40px;
text-overflow:ellipsis;
display:-webkit-box; 
white-space:pre-wrap;
-webkit-box-orient:vertical;
-webkit-line-clamp:2; 
text-indent:4em;
}
.recommend-money{
    float: left;
}
.backmoney{
    padding: 0 5px 0  5px;
    float: right;
    min-width: 124px;
height: 36px;
background: #FFFFFF;
border-radius: 27px;
border: 2px solid #EE1400;
font-size: 20px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #EE1400;
line-height: 36px;
text-align: center;
margin-right: 40px;
margin-top: 10px;
}
.price{
    clear: both;
    
}
.foot{
    width: 750px;
    height: 100px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    z-index: 4;
}
.collection{
    float: left;
    width: 160px;
    height: 72px;
    margin: 14px 0 0 20px;
}
.foot-right{
    width: 403px;
    height: 72px;
    margin: 14px 20px 0 0;
    float: right;
}
.share{
    width: 200px;
    height: 72px;
    background: #FFA837;
    text-align: center;
    float: left;
    color: #fff;
    border-radius: 36px 0px 0px 36px;
}
.share-text{
    
height: 40px;
font-size: 28px;
font-family: PingFang-SC-Bold, PingFang-SC;
font-weight: bold;
color: #FFFFFF;
line-height: 40px;
padding-top: 5px;

}
.share-num{
    
height: 22px;
font-size: 16px;
font-family: PingFang-SC-Medium, PingFang-SC;
font-weight: 500;
color: #FFFFFF;
line-height: 22px;
}
.buy{
    width: 200px;
height: 72px;
background: #FC5105;
border-radius: 0px 36px 36px 0px;
float: left;
 text-align: center;
    color: #fff;
}
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
.message{
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    font-size: 26px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    z-index: 999;
    border-radius: 10px;
    color: #fff;
}
</style>

