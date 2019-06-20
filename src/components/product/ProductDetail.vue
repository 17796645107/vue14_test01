<template>
  <!--作者：邓宁宁
  时间：2018-09-26
  描述：商品详情页-->
    <div class="productDetail">
      <IndexHeadTop></IndexHeadTop>
      <IndexHeadSearch v-bind:cartNumber = "cartNumber" v-on:putCartCount = "getCartCount"></IndexHeadSearch>
      <IndexHeadNav></IndexHeadNav>

      <!--内容-->
      <div class="body">
        <div class="product_detail">
          <div class="p_img">
            <img v-bind:src="'../../static/product/'+Product.defaultImage.image">
            <div class="img_list">
              <ul>
                <li v-for="image in ImageList" v-if="image.colorId === ColorId_now">
                  <img :src="'../../static/product/'+image.image" @click="showBigImage(image.image)"/>
                </li>
              </ul>
            </div>
            <div class="p_collect">
              <span>商品编码:{{Product.productNo}}</span>
              <a href="">
                <i></i>收藏商品
              </a>
              <div class="share">
                <i></i><span>分享到:</span>
              </div>
            </div>
            <div class="p_service">
              <ul>
                <li>
                  <i></i>100%正品
                </li>
                <li>
                  <i></i>七天放心退
                </li>
                <li>
                  <i></i>支持退货
                </li>
              </ul>
            </div>
          </div>
          <div class="p_detail">
            <div class="p_brand">
              {{Product.seller.brand.brandName}}
            </div>
            <div class="p_title">
              <h2>{{Product.title}}</h2>
            </div>
            <div class="p_describe">
              {{Product.detail}}
            </div>
            <div class="p_price">
              <strong>￥349</strong>
              <del>￥499</del>
              <span>7折</span>
            </div>
            <div class="p_size">
              <label>颜色</label>
              <ul>
                <li v-for="(color,index) in ColorList" @click="changeImage(color.id,color.color)" v-on:click="addClassColor(index)">
                  {{color.color}}<span v-bind:class="{bg:index === currentOne}"></span>
                </li>
              </ul>
            </div>
            <div class="p_size">
              <label>尺码</label>
              <ul>
                <li v-for="(size,index) in SizeList"  v-on:click="addClassSize(index,size.size)">
                  {{size.size}}<span v-bind:class="{bg:index === currentTwo}"></span>
                </li>
              </ul>
            </div>
            <div class="p_number">
              <label>数量</label>
              <div class="btn_number">
                <a href="javascript:;" @click="minus">-</a>
                <input type="text" v-model="number" @blur="checkNumber()" />
                <a href="javascript:;" @click="add">+</a>
              </div>
            </div>
            <div class="p_num">
              <label></label>
              库存：{{product_num}}
            </div>
            <div class="btn_buy">
              <label></label>
              <span class="button_buy_product" @click="addGoodCart">加入购物车</span>
            </div>
            <div class="vip">
              <label></label>
              <p>
                您是<span>铁牌</span>会员，购买最多可获得 <span>174</span>个唯品币(会员等级越高唯品币越多)
              </p>
            </div>
          </div>
        </div>
        <div class="product_evaluate">
        </div>
      </div>

      <IndexFoot></IndexFoot>
    </div>
</template>

<script>
  import IndexHeadTop from "../index/IndexHeadTop"
  import IndexHeadSearch from  "../index/IndexHeadSearch"
  import IndexHeadNav from "../index/IndexHeadNav"
  import IndexFoot from "../index/IndexFoot"
    export default {
      name: "ProductDetail",
      data(){
        return{
          Product:'',//商品信息
          ImageList:'',//图片列表
          ColorList:'',//颜色列表
          SizeList:'',//尺寸列表
          ColorId_now:'',//当前商品颜色的颜色ID
          number:1,// 商品数量,默认为1
          currentOne:"",//选中颜色
          currentTwo:"",//选中尺寸
          selectColor:'',//用户选中的颜色,默认为列表第一个
          selectSize:'',//用户选中的尺寸,默认为列表第一个
          cartNumber:0,
          product_num:"",//商品库存
        }
      },
      methods:{
        getCartCount:function(count){
          this.cartNumber = count;
        },
        //添加商品到购物车
        addGoodCart:function(){
          //用户未登录
          if (this.userState !=="true") {
            alert("请先登录...！");
            this.$router.push({
              path:'/user/login',
            });
          }else{
            if (this.number > this.product_num){
              alert("请输入正确的数量！");
              return ;
            }
            //添加商品到购物车
          fetch("/apis/goodCart/saveGoodCart",{
            method:"post",
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({
              "userNo":this.User.id,
              "product_id":this.Product.defaultImage.productId,
              "product_color":this.selectColor,
              "product_size":this.selectSize,
              "product_number":this.number,
            })
          }).then(result =>{
              return result.json()
            }).then(data =>{
              if (data["code"] === 200 ){
                alert("添加购物车成功!");
                this.$set(data,this.cartNumber,this.cartNumber++);
              }else{
                alert("添加购物车失败:"+data["msg"]);
              }
            })
          }
        },
        //获取用户信息
        //点击小图,查看大图效果
        showBigImage:function(image){
          //这样就能被vue监控到，更新视图
          this.$set(this.Product.defaultImage,"image",image);
        },
        //颜色,尺寸选中效果
        addClassColor:function(index){
          this.currentOne = index;
          //获取商品库存
          this.getProductNum();
        },
        addClassSize:function(index,size){
          this.currentTwo = index;
          //选择尺寸
          this.selectSize = size;
          //获取商品库存
          this.getProductNum();
        },
        //数量+
        add:function(){
          if(this.number < this.product_num){
            this.number++;
          }
        },
        //数量-
        minus:function(){
          if (this.number > 1){
            this.number--;
          }
        },
        checkNumber:function(){
          if (this.number > this.product_num)
            this.number = this.product_num;
        },
        //查看选中颜色的商品图片
        changeImage:function(colorId,color){
          //更换小图片
          this.ColorId_now = colorId;
          //更换大图
          for(let i=0;i<this.ImageList.length;i++){
            if (this.ImageList[i]["colorId"] === colorId) {
              this.$set(this.Product.defaultImage,"image",this.ImageList[i]["image"]);
              break;
            }
          }
          //选择颜色
          this.selectColor = color;
        },
        //获取商品信息
        getProductById:function (productId) {
          let url = "/apis/product/getProductByProductId/"+productId;
          fetch(url,{
            method:'get'
          }).then(result =>{
            return result.json()
          }) .then(data =>{
            if (data["code"] === 200){
              this.Product = data["data"];
            }else {
              alert(data["msg"]);
            }
          })
        },
        //获取商品全部图片
        getProductImage(productId){
          let url = "/apis/product/findProductImages/"+productId;
          fetch(url,{
            method:'get'
          }).then(result =>{
            return result.json()
          }).then(data =>{
              if (data["code"] === 200){
                this.ImageList = data["data"];
              }else {
                alert(data["msg"]);
              }
            })
        },
        //获取商品全部颜色
        getProductColors(productId){
          let url = "/apis/product/findProductColors/"+productId;
          fetch(url,{
            method:'get'
          }).then(result =>{
            return result.json()
          }).then(data =>{
              if (data["code"] === 200){
                this.ColorList = data["data"];
                //默认展示第一种商品颜色
                this.ColorId_now = data["data"][0]["id"];
                //默认选中第一种商品颜色
                //this.selectColor = data["data"][this.currentOne]["color"];
              }else {
                alert(data["msg"]);
              }
            });
        },
        //获取商品全部尺寸
        getProductSizes(productId){
          let url = "/apis/product/findProductSizeByProductId/"+productId;
          fetch(url,{
            method:'get'
          }).then(result =>{
            return result.json()
          }).then(data =>{
              if (data["code"] === 200){
                this.SizeList = data["data"];
                //默认选中第一种商品尺寸
                //this.selectSize = data["data"][this.currentTwo]["size"];
              }else {
                alert(data["msg"]);
              }
            });
        },
        getProductNum:function () {
          fetch("/apis/product/findProductNum",{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              "productId":this.Product.defaultImage.productId,
              "product_color":this.selectColor,
              "product_size":this.selectSize,
            })
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              this.product_num = data["data"];
            }else {
              alert(data["msg"]);
            }
          })
        },
        getAllProductNum(id){
          fetch("/apis/product/findProductNum",{
            method:"post",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              "productId":id,
            })
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              this.product_num = data["data"];
            } else{
              alert(data["msg"]);
            }
          })
        }
      },
      computed:{
        //获取用户信息
        User:function () {
          return this.$store.getters.getUser;
        },
        //获取用户登录状态
        userState:function () {
          return this.$store.getters.getUserState;
        },
      },
      created(){
        this.getProductById(this.$route.query.product_id);
        this.getProductColors(this.$route.query.product_id);
        this.getProductImage(this.$route.query.product_id);
        this.getProductSizes(this.$route.query.product_id);
        this.getAllProductNum(this.$route.query.product_id);
      },
      components:{
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
      },
      mounted(){
      },
    }
</script>

<style scoped>
  .body{
    width: 1000px;
    margin: 0 auto;
  }
  .product_detail{
    margin-top: 50px;
    width: 100%;
    overflow: hidden;
  }
  .p_img{
    width: 420px;
    height: 700px;
    float: left;
  }
  .p_img>img{
    width: 332px;
    height: 420px;
    padding: 0 44px;
    background: rgb(247,247,247);
  }
  .img_list{
    margin-top: 10px;
    width: 100%;
    height: 64px;
  }
  .img_list>ul{
    width: 100%;
    height: 100%;
  }
  .img_list>ul>li{
    width: 14%;
    height: 100%;
  }
  .img_list>ul>li:hover{
    cursor: pointer;
  }
  .img_list>ul>li:not(:last-child){
    margin-right: 3%;
  }
  .img_list>ul>li>img{
    width: 100%;
    height: 100%;
    border: 1px solid  #999999;
    box-sizing: border-box;
  }
  .p_collect{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    border-bottom:1px #e2e2e2 dashed;
  }
  .p_collect>a{
    color: #999;
  }
  .p_collect>a>i{
    width: 16px;
    height: 15px;
    display: inline-block;
    margin-left: 20px;
    margin-right: 2px;
    background: url(../../assets/product/detail-sprites-hash-ca10c0e2.png)-543px -150px;
  }
  .share{
    width: 95px;
    height: 24px;
    line-height: 24px;
    margin-top: 10px;
    text-align: center;
    display: inline-block;
    background: #fafafa;
    border: solid 1px #c2c2c2;
    border-radius: 2px;
    cursor: pointer;
    float: right;
  }
  .p_service{
    width: 100%;
    height: 60px;
    margin-top:10px ;
  }
  .p_service>ul>li{
    width: 140px;
    height: 50px;
    line-height: 50px;
    color: #B2B2B2;
  }
  .p_service>ul>li:nth-child(1)>i{
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url(../../assets/product/detail-sprites-hash-ca10c0e2.png);
    background-position: -360px -190px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .p_service>ul>li:nth-child(2)>i{
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url(../../assets/product/detail-sprites-hash-ca10c0e2.png);
    margin-right: 10px;
    background-position: -496px -190px;
    vertical-align: middle;
  }
  .p_service>ul>li:nth-child(3)>i{
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url(../../assets/product/detail-sprites-hash-ca10c0e2.png);
    margin-right: 10px;
    background-position: -326px -190px;
    vertical-align: middle;
  }
  .p_detail{
    width: 550px;
    height: 700px;
    float: right;
  }
  .p_brand{
    width: 100%;
    height: 22px;
    line-height: 22px;
    color: #777578;;
  }
  .p_title{
    width: 100%;
    height: 30px;
    margin: 5px 0;
  }
  .p_describe{
    width: 100%;
    color:#999;
  }
  .p_price{
    width: 100%;
    height: 70px;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-bottom: 20px;
    background: url(../../assets/product/detail_price_bg_l-hash-8ee789be.png)no-repeat #faf5f8;
    overflow: hidden;
  }
  .p_price>strong{
    display: inline-block;
    font-size: 48px;
    color: #f43499;
    margin: 15px;
  }
  .p_price>span{
    font-size: 12px;
    color: #f43499;
    border-radius: 3px;
    text-align: center;
    border: 1px solid #f43499;
    padding: 2px 5px ;
  }
  .p_price>del{
    color: #666;
  }
  /*.p_freight{
    width: 100%;
    overflow: hidden;
    margin: 10px 0;
  }
  .p_freight>label{
    width: 40px;
    display: block;
    font-size: 14px;
    color: #999;
    float: left;
  }
  .p_freight>span{
    display: block;
    float: left;
    font-size: 14px;
    color: #000000;
  }*/
  .p_size{
    width: 100%;
  }
  .p_size>label{
    display: block;
    width: 40px;
    height: 100%;
    float: left;
    padding-top: 20px;
    font-size: 14px;
    color: #999;
  }
  .p_size>ul{
    overflow: hidden;
  }
  .p_size>ul>li{
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .p_size>ul>li:hover{
    border-color: rgb(244,52,153);
  }
  .selected{
    background-image: url("../../assets/product/detail-sprites-hash-142cbc40.png");
    background-position: -86px -156px;
    opacity: 0.5;
    border: 2px solid #f43499;
  }
  .bg{
    display: block;
    width: 17px;
    height: 16px;
    background-image: url("../../assets/product/detail-sprites-hash-142cbc40.png");
    background-position: -144px -170px;
    position: relative;
    top:-16px;
    left:58px;
  }
  .p_number{
    margin: 20px 0;
    width: 100%;
    overflow: hidden;
  }
  .p_number>label{
    width: 40px;
    height: 100%;
    display: block;
    font-size: 14px;
    color: #999;
    float: left;
    padding-top: 10px;
  }
  .p_num{
    width: 100%;
    height: 20px;
    color: fuchsia;
  }
  .p_num>label{
    display: inline-block;
    width: 40px;
  }
  .btn_number{
    width: 75px;
    height: 30px;
    border: 1px solid #b3b3b3;
    display: block;
    float: left;
    overflow: hidden;
  }
  .btn_number>a{
    width: 22px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f9f8f8;
    color: #dad8d8;
    display: inline-block;
  }
  .btn_number>a:nth-child(1){
    border-right: 1px solid rgb(228,227,227);
    float: left;
  }
  .btn_number>a:nth-child(3){
    border-left: 1px solid rgb(228,227,227);
    float: right;
  }
  .btn_number>input{
    display: inline-block;
    width: 29px;
    height: 32px ;
    line-height: 32px;
    text-align: center;
    font: 12px/1.5 tahoma,arial,Hiragino Sans GB,
    WenQuanYi Micro Hei,\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
    border: 0;
  }
  .btn_buy{
    margin: 20px 0;
    width: 100%;
    overflow: hidden;
  }
  .btn_buy>label{
    width: 40px;
    height: 100%;
    display: block;
    float: left;
    padding-top: 10px;
  }
  .button_buy_product{
    width: 198px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    display: block;
    float: left;
    background-color: #f10180;
    border: 1px solid #f10180;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }
  .vip{
    width: 100%;
    height: 26px;
    overflow: hidden;
    border-bottom:1px #e2e2e2 dashed;
  }
  .vip>label{
    width: 40px;
    height: 100%;
    display: block;
    float: left;
    padding-top: 10px;
  }
  .vip>p{
    font-size: 12px;
    color: #999;
  }
  .vip>p>span{
    color: #f62e99;;
    margin: 0 3px;
  }

</style>
