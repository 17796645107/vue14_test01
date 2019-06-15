<template>
  <!--
    作者：offline
    时间：2018-09-27
    描述：购物车页面
  -->
  <div class="goodCart">
    <OrderTop></OrderTop>

    <div class="body">
      <div class="goodCart_warp">
        <div class="goodCart_list">
          <table cellspacing="0">
            <tr class="goodCart_title">
              <td>精选特卖</td>
              <td>单价</td>
              <td>数量</td>
              <td>小计</td>
              <td>操作</td>
            </tr>
            <!--购物车列表-->
            <tr class="goodCart" v-for="goodCart in GoodCartList">
              <td>
                <div class="p_info">
                  <a href="">
                    <img :src="'../../static/product/'+goodCart.product.default_image.image" alt="" />
                  </a>
                  <div class="p_title">
                    <p>{{goodCart.product.title}}</p>
                    <p class="p_size">
                      尺码：<span>{{goodCart.product_size}}</span>&nbsp;&nbsp;&nbsp;
                      颜色: <span>{{goodCart.product_color}}</span>
                    </p>
                  </div>
                </div>
              </td>
              <td class="p_price">
                <span>{{goodCart.product.price}}</span><br>
                <del>¥2880</del>
              </td>
              <td class="p_number">
                <div class="btn_number">
                  <a href="javascript:;">-</a>
                  <em>{{goodCart.product_number}}</em>
                  <a href="javascript:;">+</a>
                </div>
              </td>
              <td class="p_subtotal">
                ¥ 1296
              </td>
              <td class="delete_goodCart">
                <a href="javascript:;" @click="deleteGoodCart(goodCart.cart_id)">删除</a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!--结算-->
      <div class="balance">
        <!--优惠券-->
        <div class="coupon">
          <div class="coupon_info">
						<span>
							已成功使用<em class="coupon_number">1</em>张优惠券
						</span>
            <strong>-￥30</strong>
            <a href="">取消使用</a>
          </div>
          <div class="p_total">
            <p>
              <span>共<em class="product_number">3</em>件商品 &nbsp;&nbsp;&nbsp;商品金额</span>
              <span class="total_price">￥3863</span>
            </p>
            <p>
              <span>优惠券优惠</span>
              <span class="coupon_price">-￥30</span>
            </p>
            <p>
              <span>总金额(未含运费)</span>
              <span class="last_total">￥3863</span>
            </p>
          </div>
        </div>
        <div class="pay">
          <a href="javascript:;" class="pay_button" @click="balance">立即结算</a>
        </div>
      </div>
      <!--商品服务-->
      <div class="product_service">
        <ul>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
        </ul>
      </div>
    </div>

    <IndexFoot></IndexFoot>

  </div>
</template>

<script>
  import OrderTop from "../order/OrderTop"
  import IndexFoot from "../index/IndexFoot"
    export default {
        name: "goodCart",
        data(){
          return{
            GoodCartList:'',
          }
        },
        methods:{
          balance:function(){
            this.$router.push({
              path:"/order/orderDetail",
              query:{
                list:JSON.stringify(this.getGoodCartListId(this.GoodCartList)),
              }
            })
          },
          getGoodCartListId:function(goodCartList){
            let idList = goodCartList.map(
              goodCart =>{
                return{
                  id:goodCart.cart_id,
                }
              }
            );
            return idList;
          },
          deleteGoodCart:function(id){
            fetch("/apis/goodCart/deleteGoodCartById/"+id,{
              method:'get',
            }).then(result =>{
              return result.json()
            }).then(data =>{
              if (data["code"] === 200){
                this.getGoodCart(this.$store.getters.getUser.user_id);
                alert("删除成功");
              }else{
                alert("删除失败");
              }
            })
          },
          getGoodCart:function (userNo) {
            let url = "/apis/goodCart/getGoodCart/"+ userNo;
            fetch(url,{
              method:'get',
            }).then(result =>{
              return result.json()
            }).then(data =>{
              if (data["code"] === 200){
                this.GoodCartList = data["data"];
              } else{
                alert(data["msg"]);
              }
            })
          },
        },
        created(){
          if (this.$store.getters.getUserState === "true") {
            let userNo = this.$store.getters.getUser.user_no;
            this.getGoodCart(userNo);
          }else{
            this.$router.push("/user/login");
          }
        },
        components:{
          IndexFoot,
          OrderTop,
        }
    }
</script>

<style scoped>
  header{
    width: 100%;
    margin-bottom: 30px;
    height: 78px;
    border-bottom: 2px solid #f3168a;

  }
  .head_warp{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
  .logo{
    width: 194px;
    height: 48px;
    margin-top: 20px;
    background: url(../../assets/goodCart/sprites-hash-bce65243.png);
    background-position: -288px 0;
    float: left;
  }
  .head_nav{
    margin-top: 10px;
    float: right;
  }
  .user_info,.telephone,.online_service,.vip_service{
    display: inline-block;
    height: 20px;
  }
  .user_info{
    color: grey;
  }
  .user_info>i{
    width: 16px;
    height: 21px;
    display: inline-block;
    background: url(../../assets/user/i-level-small.png);
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .user_info a{
    color: grey;
  }
  .logout{
    margin:0 15px;
  }
  .telephone{
    width: 86px;
    height: 14px;
    line-height: 14px;
    padding: 0 10px;
    color: grey;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    text-align: center;
    margin: 0 5px;
  }
  .online_service{
    width: 68px;
    height: 14px;
    line-height: 14px;
    padding: 0 10px 0 0;
    color: grey;
    border-right: 1px solid grey;
    text-align: center;
    margin: 0 5px;
  }
  .vip_service{
    color: grey;
  }
  .service{
    margin-top: 10px;
    width: 420px;
    height: 20px;
  }
  .service li:nth-child(1)>i{
    display: inline-block;
    width: 27px;
    height: 25px;
    background: url(../../assets/goodCart/1.png);
    margin-right: 10px;
    vertical-align: middle;
  }
  .service li:nth-child(2)>i{
    display: inline-block;
    width: 27px;
    height: 25px;
    background: url(../../assets/goodCart/3.png);
    margin: 0 10px 0 20px;
    vertical-align: middle;
  }
  .service li:nth-child(3)>i{
    display: inline-block;
    width: 27px;
    height: 25px;
    background: url(../../assets/goodCart/2.png);
    margin: 0 10px 0 20px;
    vertical-align: middle;
  }

  /*main*/

  .body{
    width: 1000px;
    margin: 0 auto;
  }
  .goodCart_warp{
    width: 100%;
  }
  .goodCart_list{
    width: 100%;
    border: 1px solid rgb(224,224,224);
    box-sizing: border-box;
  }
  .goodCart_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgb(249,249,249);
  }
  .goodCart_title>td:nth-child(1){
    width: 480px;
    padding-left: 20px;
  }
  .goodCart_title>td:nth-child(2){
    width: 100px;
  }
  .goodCart_title>td:nth-child(3){
    width: 200px;
    text-align: center;
  }
  .goodCart_title>td:nth-child(4){
    width: 100px;
  }
  .goodCart_title>td:nth-child(5){
    width: 100px;
  }
  .goodCart{
    width: 100%;
    height: 120px;
  }
  .goodCart>td:nth-child(1){
    width: 500px;
  }
  .goodCart>td:nth-child(2){
    width: 100px;
  }
  .goodCart>td:nth-child(3){
    width: 200px;
    text-align: center;
  }
  .goodCart>td:nth-child(4){
    width: 100px;
  }
  .goodCart>td:nth-child(5){
    width: 100px;
  }
  .p_info{
    margin: 5px 20px;
  }
  .p_info>a{
    float: left;
  }
  .p_info>a>img{
    width: 58px;
    height: 74px;
  }
  .p_title{
    width: 250px;
    height: 70px;
    margin-left: 10px;
    float: left;
  }
  .p_size{
    margin-top: 10px;
  }
  .p_price>span{
    color: #000000;
    font-weight: bold;
    font-family: Arial!important;
    font-size: 14px;
  }
  .btn_number{
    width: 70px;
    height: 20px;
    border: 1px solid #b3b3b3;
    overflow: hidden;
    margin-left: 60px;
  }
  .btn_number>a{
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-color: #f9f8f8;
    color: #aaa;
    font-size: 15px;
    font-weight: 300;
  }
  .btn_number>a:nth-child(1){
    border-right: 1px solid rgb(228,227,227);
    float: left;
  }
  .btn_number>a:nth-child(3){
    border-left: 1px solid rgb(228,227,227);
    float: right;
  }
  .btn_number>em{
    display: inline-block;
    width: 22px;
    height:20px;
    line-height: 20px;
    float: left;
    font: 12px/1.5 tahoma,arial,Hiragino Sans GB,
    WenQuanYi Micro Hei,\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
  }
  .p_subtotal{
    color: #f10180;
    font-weight: bold;
    font-family: Arial!important;
    font-size: 14px;
  }
  .delete_goodCart>a{
    color: #666;
  }
  .balance{
    margin-top: 50px;
    width: 100%;
    border: 1px solid rgb(236,235,235);
    height: 161px;
    box-sizing: border-box;
  }
  .coupon{
    width: 100%;
    height: 110px;
    overflow: hidden;
  }
  .coupon_info{
    margin: 20px 0 0 10px;
    font-size: 16px;
    color: #9c9c9c;
    float: left;
  }
  .coupon_number{
    font: 16px/1.5 tahoma,arial,
    Hiragino Sans GB,WenQuanYi Micro Hei,\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
    color: #f10180!important;
    margin: 0 2px;
  }
  .coupon_info>strong{
    margin-left: 15px;
    color: #f10180!important;
  }
  .coupon_info>a{
    margin-left: 10px;
    color: #1d94d1;
  }
  .coupon_info>a:hover{
    color: rgb(60,189,255);
  }
  .p_total{
    margin: 20px 20px 0 0;
    float: right;
    font-size: 14px;
    color: #888;
    text-align: right;
  }
  .p_total>p{
    margin-bottom: 10px;
  }
  .total_price,.coupon_price,.last_total{
    display: inline-block;
    width: 110px;
    color: black;
  }
  .last_total{
    color: #ed2787;
    font-weight: 600;
  }
  .pay{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgb(243,243,243);
  }
  .pay_button{
    display: block;
    width: 250px;
    height: 50px;
    background-color: #f10180;
    border: 1px solid #f10180;
    box-sizing: border-box;
    float: right;
    color: white;
    text-align: center;
    font-size: 20px;
  }
  .product_service{
    margin: 80px 0;
  }
  .product_service>ul{
    width: 100%;
    height: 141px;
    overflow: hidden;
  }
  .product_service>ul>li:nth-child(1){
    width: 302px;
    height: 100%;
    background: url(../../assets/goodCart/sprites-hash-26c6eaee.png);
    margin-right: 45px;
  }
  .product_service>ul>li:nth-child(2){
    width: 302px;
    height: 100%;
    background: url(../../assets/goodCart/sprites-hash-26c6eaee.png);
    background-position: -306px 0;
    margin-right: 45px;
  }
  .product_service>ul>li:nth-child(3){
    width: 302px;
    height: 100%;
    background: url(../../assets/goodCart/sprites-hash-26c6eaee.png);
    background-position: 0 -145px;
  }
  footer{
    width: 100%;
    height: 150px;
  }
  .footer_context{
    height: 75px;
  }

</style>
