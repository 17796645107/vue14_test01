<template>
  <div class="index">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>
    <!--<IndexHeadNav v-bind:navList="navList.nav"></IndexHeadNav>-->

    <!--轮播图-->
    <div class="banner">
      <div class="banner_main">
        <ul>
          <li><img src="../../assets/index/banner1.jpg"></li>
          <li></li>
        </ul>
        <span class="banner_float_btn"><i></i></span>
        <span class="banner_float_btn"><i></i></span>

        <div class="banner_switch_btn">
          <ul>
            <li>家居家紡 最高滿199減100</li>
            <li>潮玩滑板鞋 低至2折</li>
          </ul>
        </div>
      </div>
    </div>

    <!--推荐商品，新人优惠商品-->
    <div class="ad">
      <div class="daily_area">
        <img src="../../assets/index/15344789862278.jpg" />
        <table cellspacing="10px">
          <tr>
            <td rowspan="2">
              <img class="ad_img1" src="../../assets/index/15344779654591.jpg" />
            </td>
            <td rowspan="2">
              <img class="ad_img1" src="../../assets/index/15347564520917.jpg" />
            </td>
            <td rowspan="2">
              <img class="ad_img1" src="../../assets/index/15344782291383.jpg" />
            </td>
            <td>
              <img class="ad_img2" src="../../assets/index/15344789267226.jpg">
            </td>
          </tr>
          <tr>
            <td>
              <img class="ad_img2" src="../../assets/index/15344783872795.jpg">
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <img class="ad_img3" src="../../assets/index/15365701882178.jpg">
            </td>
          </tr>

        </table>
      </div>

      <!--<div class="newGoods_area">
        <div class="newGoods_title">
          <img src="../../assets/index/title.png">
        </div>

        <div class="newGoods_nav">
          <div class="new_kill">
            <img src="../../assets/index/sec_icon.png">
            <span>今日秒殺</span>
          </div>
          <div class="newGoods_list">
            <ul>
              <li><a href="">护肤</a></li>
              <li><a href="">女装</a></li>
              <li><a href="">男装</a></li>
              <li><a href="">母婴</a></li>
              <li><a href="">箱包</a></li>
              <li><a href="">内衣</a></li>
              <li><a href="">零食</a></li>
              <li><a href="">家电</a></li>
              <li style="border: 0;">
                <a href="">家用</a>
              </li>
            </ul>
          </div>
        </div>

        <table cellspacing="0" border="1" rules="all">
          <tr>
            <td rowspan="2">
              <img src="../../assets/index/20180915105234.png">
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/2e099294-7af5-4115-9a17-d42a8d756f2d_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/0b5701e7-50cb-4aa4-931d-93abe81de43f_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/c74a2d84-800e-40f8-96f0-46532db56946_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/6b17f181-4ae1-4c37-88b9-e32f7159cafe_t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/2e099294-7af5-4115-9a17-d42a8d756f2d_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/0b5701e7-50cb-4aa4-931d-93abe81de43f_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/c74a2d84-800e-40f8-96f0-46532db56946_5t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
            <td>
              <a href="">
                &lt;!&ndash;<img src="../../assets/index/6b17f181-4ae1-4c37-88b9-e32f7159cafe_t.jpg.webp">&ndash;&gt;
                <p>【2018新品】轻熟风优雅通勤简约百搭纯色木耳边灯笼袖显瘦长袖短款女士雪纺衫上衣女款衬衫</p>
                <span>秒杀价￥<b>69</b><del>￥198</del></span>
              </a>
            </td>
          </tr>
        </table>
      </div>-->
    </div>

    <div class="main">
      <div v-bind:class="{mainLeft_nav:true,mainLeft_nav_fixed:leftNavFixed}" id="mainLeft_nav" >
        <ul>
          <li>
            <a href="#jingxuan">
              <i></i>精选
            </a>
          </li>
          <li>
            <a href="#huodong">
              <i></i>活动
            </a>
          </li>
          <li v-for="nav in navList.nav">
            <a href="javascript:;">
              <i></i>{{nav.categoryName}}
            </a>
          </li>
        </ul>
      </div>
      <div class="main_context">
        <div class="main_title">
          <img src="../../assets/index/today_DDp.png" />
        </div>
        <div class="main_product">
          <!--精选-->
          <a name="jingxuan" class="h1">精选</a>
        </div>

        <div class="main_product">
          <a name="huodong" class="h1">活动</a>
        </div>

        <div class="main_product">
          <a name="nvzhuang" class="h1">{{navList.nav[0].categoryName}}</a>
          <div class="product" v-for="seller in oneSellers">
            <a href="javascript:;" @click="goProductMenu(seller.id)" class="seller_go">
              <img class="test" :src="'../../static/seller/seller/'+seller.showImage" />
            </a>
            <span @click="collectSeller(seller.id)" class="product_collect">收藏品牌</span>
          </div>
        </div>

        <div class="main_product">
          <a name="nvzhuang" class="h1">{{navList.nav[1].categoryName}}</a>
          <div class="product" v-for="seller in twoSellers">
            <a href="javascript:;" @click="goProductMenu(seller.id)" class="seller_go">
              <img class="test" :src="'../../static/seller/seller/'+seller.showImage" />
            </a>
            <span @click="collectSeller(seller.id)" class="product_collect">收藏品牌</span>
          </div>
        </div>
      </div>
    </div>

    <IndexFoot></IndexFoot>
  </div>
</template>

<script>
  import IndexHeadTop from "./IndexHeadTop"
  import IndexHeadSearch from  "./IndexHeadSearch"
  import IndexHeadNav from "./IndexHeadNav"
  import IndexFoot from "./IndexFoot"

  export default {
    name: "Index",
    data(){
      return{
        leftNavFixed:false,
        navList:{
          //导航列表
          nav:"",
          //锚点列表
          // navName:[
          //   {name:"nvzhuang"},
          //   {name:"nanzhuang"},
          //   {name:"neiyi"},
          //   {name:"nvxie"},
          //   {name:"nanxie"},
          //   {name:"xiangbao"},
          //   {name:"yundong"},
          //   {name:"tongzhuang"}
          // ],
        },
        oneSellers:'',
        twoSellers:"",
      }
    },
    methods:{
      goProductMenu:function (sellerId) {
        this.$router.push({
          path:'/product/productMenu',
          query:{
            seller_id:sellerId,
          },
        })
      },
      getNavList:function () {
        fetch("/apis/product/findCategoryByParentId/0",{
          method:'get',
        }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              //存入Session中
              sessionStorage.setItem("navList",JSON.stringify(data["data"]));
              this.navList.nav = data["data"];
            } else {
              alert(data["msg"]);
            }
          })
      },
      collectSeller:function (id) {
        if (this.$store.getters.getUserState === "true") {
          fetch("/apis/user/collectSeller",{
            method:"post",
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({"user_id":this.getUser.user_id,"seller_id":id})
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if(data["code"] === 200){
              alert("收藏商户成功");
            }else {
              alert("收藏商品失败:"+data["msg"]);
            }
          })
        }else {
          alert("请先登录....");
          this.$router.push("/user/login");
        }
      },
      getTypeOneSeller:function () {
        fetch("/apis/seller/getSellerByType/1",{
          method:'get',
        }).then(result =>{
          return result.json()
        }).then(data =>{
          if (data["code"] === 200){
            this.oneSellers = data["data"];
          }else {
            alert(data["msg"]);
          }
        });
      },
      getTypeTwoSeller:function () {
        fetch("/apis/seller/getSellerByType/2",{
          method:'get',
        }).then(result =>{
          return result.json()
        }).then(data =>{
          if (data["code"] === 200){
            this.twoSellers = data["data"];
          }else {
            alert(data["msg"]);
          }
        });
      },
    },
    computed:{
      //获取用户登录状态
      getUserState(){
        return this.$store.getters.getUserState;
      },
      getUser(){
        return this.$store.getters.getUser;
      }
    },
    created(){
      if (sessionStorage.getItem("navList") == null){
        this.getNavList();
      } else {
        this.navList.nav = JSON.parse(sessionStorage.getItem("navList"));
      }
      //查询女装商户
      this.getTypeOneSeller();
      //查询男装商户
      this.getTypeTwoSeller();
      //导航栏固定左侧效果
      window.addEventListener('scroll',()=>{
        if(window.pageYOffset>1860){
          this.leftNavFixed = true;
        }else if(window.pageYOffset<1860 && window.pageYOffset>130){
          this.leftNavFixed = false;
        }
      });
    },
    components:{
      IndexHeadTop,
      IndexHeadSearch,
      IndexHeadNav,
      IndexFoot,
    },
  }
</script>

<style scoped>
  /*横幅*/
  .banner{
    width: 100%;
    height: 400px;
    /*padding: 30px 0 20px 0;*/
    background: url(../../assets/index/bannerBG.jpg) no-repeat center;
  }
  .banner_main{
    width: 976px;
    height: 368px;
    margin: 0 auto;
    padding: 12px;
    background: rgba(255,255,255,.86);
    box-shadow: 0 1px 3px rgba(167,167,167,.4);
  }
  .banner_main>ul{
    width: 100%;
    height: 340px;
  }
  .banner_main>ul>li{
    height: 340px;
  }
  .banner_main>ul>li>img{
    width: 100%;
    height: 340px;
  }
  .banner_switch_btn{
    width: 100%;
    height: 40px;
  }
  .banner_switch_btn>ul{
    width: 391px;
    height: 100%;
    margin: 0 auto;
  }
  .banner_switch_btn li{
    width: 195px;
    height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 13px;
    text-align: center;
    border-bottom: rgb(230,5,125) 3px solid;
  }
  .banner_switch_btn li:nth-child(1):after{
    content: "|";
    /*font-family: tohama;*/
    font-size: 10px;
    margin-left: 25px;
    color: #e8e8e8;
    position: relative;
    right: 0;
  }
  /*广告*/
  .ad{
    width: 1000px;
    margin: 0 auto;
  }
  .daily_area{
    width: 100%;
  }
  .daily_area>img{
    width: 100%;
  }
  .ad_img1{
    width: 210px;
    height: 200px;
  }
  .ad_img2{
    width: 320px;
    height: 88px;
  }
  .ad_img3{
    width: 100%;
    height: 136px;
  }
  .daily_area>table{
    width: 100%;
  }
  .newGoods_area{
    padding-top: 50px;
    width: 1000px;
    margin: 0 auto;
  }
  .newGoods_title{
    width: 566px;
    margin: 0 auto;
  }
  .newGoods_nav{
    width: 100%;
    height: 30px;
    /*line-height: 30px;*/
    margin-bottom: 5px;
  }
  .new_kill{
    float: left;
  }
  .newGoods_list{
    float: right;
  }
  .newGoods_list>ul{
    height: 30px;
  }
  .newGoods_list>ul>li{
    width: 57px;
    height: 18px;
    margin-top: 6px;
    text-align: center;
    border-right:1px solid gray ;
    color: #333;
  }
  .newGoods_list a{
    font-size: 14px;
    color: #333;
  }
  .newGoods_area>table{
    width: 1000px;
    border-color: rgb(229,229,229);
  }
  .newGoods_area>table a{
    width: 132px;
    height: 250px;
    display: inline-block;
    margin: 20px 24px;
  }
  .newGoods_area>table a>img{
    width: 132px;
    height: 166px;
  }
  .newGoods_area>table a>p{
    /*width: 132px;
    height: 42px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: black;
    -webkit-line-clamp: 2;*/
  }
  .newGoods_area>table a>p:hover{
    color: fuchsia;
  }
  .newGoods_area>table a>span{
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    margin-top: 10px;
    font-size:13px ;
    color: #f10180;
    overflow: hidden;
  }
  .newGoods_area>table span>b{
    font-size:22px ;
    color: #f10180;
  }
  .newGoods_area>table span>del{
    margin-top: 3px;
    float: right;
    font-size:13px;
    color: #999;
  }
  /*商品*/
  .main{
    width: 100%;
    padding-top: 100px;
  }
  /* 左侧导航栏*/
  .mainLeft_nav{
    width: 78px;
    /*height: 390px;*/
    margin: 70px auto;
    left: 50px;
    position: absolute;
  }
  .mainLeft_nav_fixed{
    left: 50px;
    top: 0;
    position: fixed;
  }
  /*媒体查询,窗口宽度小于1156px时,左侧导航栏会隐藏*/
  @media (max-width:1156px ) {
    .mainLeft_nav{
      display: none;
    }
  }
  /*窗口宽度小于1256px时,左侧导航栏会贴边*/
  @media (max-width:1256px ) {
    .mainLeft_nav{
      left: 0;
    }
    /*滚动条大于1860px*/
    .mainLeft_nav_fixed{
      left: 0;
    }
  }
  .mainLeft_nav>ul{
    width: 76px;
    height: 100%;
    border: 1px solid rgb(214,214,214);
    border-radius: 5px;
  }
  .mainLeft_nav>ul>li{
    width: 66px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    border-bottom:1px rgb(234,234,234) solid;
    margin: 5px 5px 0 5px;
  }
  .mainLeft_nav>ul>li:nth-child(1){
    background: rgb(241,1,128);
  }
  .mainLeft_nav>ul>li:nth-child(1)>a{
    color: white;
  }
  .mainLeft_nav li>a{
    width: 100%;
    height: 100%;
    display: block;
    font-size: 12px;
    color: #666666;
  }
  .mainLeft_nav li>a:hover{
    color: rgb(241,1,128);
  }
  .aName{
    width: 66px;
    height: 34px;
    display: inline-block;
    position: relative;
    top: -310px;
    left: 5px;
    cursor: pointer;
  }
  .main_context{
    width: 1000px;
    margin: 0 auto;
  }
  .main_title{
    width: 100%;
    height: 68px;
  }
  .main_title>img{
    width: 100%;
  }
  .main_product{
    width: 100%;
    overflow:hidden;
  }
  .h1{
    display: block;
    font-size: 24px;
    font-weight: 900;
    border-bottom:3px solid black;
    margin-bottom: 5px;
    text-align: left;
  }
  /*商品*/
  .product{
    float: left;
  }
  .product:nth-child(2n){
    width: 490px;
    height: 235px;
    padding: 0 20px 20px 0;
  }
  .product:nth-child(2n-1){
    width: 490px;
    height: 235px;
  }
  .product > .seller_go{
    display: block;
    width: 100%;
    height: 100%;
  }
  .seller_go>img{
    width: 100%;
    height: 100%;
  }
  .product:hover .test{
    width: 100%;
    height: 100%;
    -webkit-filter: blur(1px);
  }
  /*.product:hover .product_hidden{*/
    /*visibility: visible;*/
  /*}*/
  /*商品隐藏层*/
  /*.product_hidden{
    width: 450px;
    height: 195px;
    visibility: hidden;
    background-color: white;
    margin-left: 20px;
    margin-top: -230px;
    position: absolute;
    border-radius:3px;
  }
  .product_hidden>ul{
    width: 350px;
    height: 140px;
    padding: 10px 50px 0 50px;
    border-bottom: 1px dashed black;
  }
  .product_hidden>ul>li{
    width: 85px;
    height: 140px;
    margin-right: 46.5px;
    text-align: center;
  }
  .product_hidden>ul>li:nth-child(3){
    margin-right: 0;
  }
  .product_hidden>ul>li>span{
    color: #333333;
    font-weight: 700;
    font-size: 14px;
  }
  .product_hidden li>a{
    width: 100%;
    height: 106px;
    border: 1px solid gainsboro;
    display: block;
  }
  .product_hidden li>a>img{
    width: 100%;
    height: 100%;
  }
  .product_button{
    width: 350px;
    height: 35px;
    margin:0 auto;
  }
  .seller_icon{
    display: inline-block;
    width: 70px;
    height: 35px;
  }
  .seller_icon>img{
    width: 100%;
    height: 100%;
  }*/
  .product_collect{
    display: inline-block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    border-radius:15px ;
    background-color: white;
    text-align: center;
    color: #000;
    position: relative;
    left: 400px;
    top: -35px;
  }
  .product_collect:hover{
    color: white;
    background-color: rgb(241,5,130);
  }
  /*.seller_go{
    display: inline-block;
    width: 135px;
    height: 25px;
    line-height: 25px;
    border: 1px solid black;
    text-align: center;
    color: #000000;
    border-radius: 3px;
    vertical-align: top;
    margin-top: 8px;
  }
  .seller_go:hover{
    color: white;
    background: black;
  }*/

</style>
