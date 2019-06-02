<template>
  <!--
    作者：邓宁
    时间：2018-09-19
    描述：用户主页
  -->
  <nav class="top_nav">
    <div class="top_nav_main">
      <div class="now_address" id="now_address">
        <span>郑州市</span><i></i>
        <div class="now_address_hidden">
          <div class="now_address_H_title">
            <p>请选择你所在的收货地区</p>
          </div>
        </div>
      </div>
      <ul class="top_nav_list">
        <li class="nav_list_login" v-show="!UserState">
          <a href="/user/login">请登录</a>
          <div class="login_hidden">
            <div class="login_msg">
              <div class="login_icon">
                <img src="../../assets/user/avatar_89373029_1496285287409.jpg" alt="">
              </div>
              <a href="/user/login">欢迎回来 [请登录]</a>
            </div>
            <div class="user_msg">
              <table border="0">
                <tr>
                  <td><a href="">我的收藏</a></td>
                  <td><a href="">我的订单</a></td>
                </tr>
                <tr>
                  <td><a href="">零钱</a></td>
                  <td><a href="">我的优惠券</a></td>
                </tr>
                <tr>
                  <td><a href="">我的唯品币</a></td>
                  <td><a href="">唯品金融</a></td>
                </tr>
              </table>
            </div>
          </div>
        </li>
        <li class="nav_list_login" v-show="UserState">
          <a href="/user/index">{{User.nickname}}</a>
          <div class="login_hidden">
            <div class="login_msg">
              <div class="login_icon">
                <img :src="'../../../static/user/headIcon/'+User.headImage" v-if="User.headImage !== ''"/>
                <img src="../../assets/user/avatar_89373029_1496285287409.jpg" v-if="User.headImage === ''"/>
              </div>
              <a href="/user/index">{{User.nickname}}</a>
              <a href="javascript:;" class="logout" @click="Logout">[退出]</a>
            </div>
            <div class="user_msg">
              <table border="0">
                <tr>
                  <td><a href="">我的收藏</a></td>
                  <td><a href="">我的订单</a></td>
                </tr>
                <tr>
                  <td><a href="">零钱</a></td>
                  <td><a href="">我的优惠券</a></td>
                </tr>
                <tr>
                  <td><a href="">我的唯品币</a></td>
                  <td><a href="">唯品金融</a></td>
                </tr>
              </table>
            </div>
          </div>
        </li>
        <li class="nav_list_register" v-show="!UserState">
          <a href="/user/register">注册</a>
        </li>
        <li class="nav_list_sign">
          <i></i><a href="">签到有礼</a>
          <!--
                      作者：1058156924@qq.com
                      时间：2018-11-10
                      描述：用户签到功能，待完善
                  -->
          <!--<div class="sign_hidden">

                  </div>-->
        </li>
        <li class="nav_list_order">
          <a href="">我的订单</a>
        </li>
        <li class="nav_list_sale">
          <a href="">我的特卖</a>
          <div class="sale_hidden">
            <span><a href="">品牌收藏(0)</a></span>
            <span><a href="">商品收藏(0)</a></span>
            <span><a href="">我的足迹(0)</a></span>
          </div>
        </li>
        <li class="nav_list_vip">
          <a href="">会员俱乐部</a>
          <div class="vip_hidden">
            <ul>
              <li><a href="">俱乐部首页</a></li>
              <li><a href="">唯品币兑换</a></li>
              <li><a href="">免费抽大奖</a></li>
            </ul>
          </div>
        </li>
        <li class="nav_list_service">
          <a href="">客户服务</a>
          <div class="service_hidden">
            <ul>
              <li><a href="">联系客服</a></li>
              <li><a href="">帮助中心</a></li>
              <li><a href="">服务中心</a></li>
              <li><a href="">知识产权起诉</a></li>
            </ul>
          </div>
        </li>
        <li class="nav_list_phone">
          <i></i><a href="">手机版</a>
          <div class="phone_hidden">
            <img src="../../assets/index/1466134037230.jpg">
          </div>
        </li>
        <li class="nav_list_more">
          <a href="">更多</a>
          <div class="more_hidden">
            <div class="zone">
              <h3>合作专区</h3>
              <ul>
                <li><a href="">联名卡申请</a></li>
                <li><a href="">唯品卡</a></li>
                <li><a href="">支付专区</a></li>
              </ul>
            </div>
            <div class="aboutMe">
              <h3>关于我们</h3>
              <ul>
                <li><a href="">sell on vip</a></li>
                <li><a href="">品牌招商</a></li>
                <li><a href="">官方博客</a></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "IndexHeadTop",
      data(){
        return{
          User:{
            user_id: '',
            nickname:"aaa",
          },
          UserState:false,
        }
      },
      methods:{
        //用户注销
        Logout:function () {
          this.$store.commit('userLogout');
          fetch("/apis/user/logout",{
            method:"post",
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] !== 1){
              alert(data["msg"]);
            }});
          //刷新界面
          window.location.reload();
        }
      },
      mounted(){
        if (this.$store.getters.getUserState === "true") {
          //获取用户登录状态
          this.UserState = this.$store.getters.getUserState;
          //获取用户信息
          this.User = this.$store.getters.getUser;
        }
      },

    }
</script>

<style scoped>
  .top_nav{
    width: 100%;
    min-width: 1000px;
    height: 28px;
    background-color: #f5f5f5;
  }
  .top_nav_main{
    width: 1000px;
    height: 28px;
    line-height:28px;
    margin: 0 auto;
    overflow: hidden;
  }
  .top_nav_main a{
    color: #777;
  }
  .top_nav_main a:hover{
    color:#F10180;
  }
  .now_address{
    width: 86px;
    float: left;
    color: #333;
  }
  .now_address_hidden{
    width: 500px;
    border: 1px solid #ccc;;
    background: red;
    /*margin-top: 28px;*/
    z-index: 2;
  }
  .now_address>span{
    margin-left:10px
  }
  .now_address>i{
    border:4px solid transparent;
    border-top-color:gray;
    top:8px;
    left: 3px;
    position: relative;
  }
  .top_nav_list{
    float: right;
    height: 100%;
  }
  .top_nav_list>ul>li{
    text-align: center;
  }
  .nav_list_login{
    width: 73px;
    z-index: 10;
  }
/*  .user_show{
    width: 73px;
    z-index: 10;
  }*/
  .nav_list_login:hover .login_hidden{
    visibility: visible;
  }
  .login_hidden{
    width: 280px;
    height: 176px;
    border: #cdcdcd 1px solid;
    background: white;
    position:absolute;
    visibility: hidden;
  }
  .login_msg{
    width: 220px;
    height: 50px;
    margin: 30px auto 0;
    overflow: hidden;
  }
  .login_msg a{
    color: black;
  }
  .login_icon{
    width: 38px;
    height: 38px;
    margin-right: 30px;
    float: left;
    /*background: url(../../assets/index/sprites-hash-12f29af9.png) -166px -138px;*/
  }
  .login_icon>img{
    width: 100%;
    height: 100%;
  }
  .logout{
    float: right;
  }
  .user_msg{
    margin-left: 30px;
  }
  .user_msg td{
    width: 100px;
  }
  .user_msg a{
    color: black;
  }
  .nav_list_register{
    width: 56px;
  }
  .nav_list_sign{
    width: 95px;
    height: 100%;
  }
  /*.nav_list_sign:hover .sign_hidden{
    visibility: visible;
  }
  .sign_hidden{
    width: 400px;
    height: 150px;
    position: absolute;
    background: white;
    border: 1px solid #CDCDCD;
    visibility: hidden;
    margin-left: -150px;
  }*/
  .nav_list_sign>i{
    width: 15px;
    height: 18px;
    display: inline-block;
    background: url(../../assets/index/gift.gif);
  }
  .nav_list_order{
    width: 83px;
  }
  .nav_list_sale{
    width: 95px;
  }
  .nav_list_sale:hover .sale_hidden{
    visibility: visible;
  }
  .sale_hidden{
    width: 95px;
    height: 110px;
    position: absolute;
    visibility: hidden;
    background: white;
    border: 1px solid #CDCDCD;
  }
  .sale_hidden a{
    display: block;
    width: 75px;
    margin: 7px auto;
    color: #000000;
  }
  .nav_list_vip{
    width: 107px;
  }
  .nav_list_vip:hover .vip_hidden{
    visibility: visible;
  }
  .vip_hidden{
    width: 107px;
    height: 120px;
    position: absolute;
    visibility: hidden;
    background: white;
    border: 1px solid #CDCDCD;
  }
  .vip_hidden>ul{
    width: 67px;
    margin:15px auto;
  }
  .vip_hidden a{
    color: black;
  }
  .nav_list_service{
    width: 105px;
  }
  .nav_list_service:hover .service_hidden{
    visibility: visible;
  }
  .service_hidden{
    width:105px ;
    height: 160px;
    position: absolute;
    visibility: hidden;
    background: white;
    border: 1px solid #CDCDCD;
  }
  .service_hidden>ul{
    width: 80px;
    margin: 15px auto;
  }
  .service_hidden a{
    color: black;
  }
  .nav_list_phone{
    width: 86px;
  }
  .nav_list_phone:hover .phone_hidden{
    visibility: visible;
  }
  .phone_hidden{
    width: 185px;
    height: 215px;
    position: absolute;
    margin-left: -60px;
    visibility: hidden;
    background: white;
    border: 1px solid #CDCDCD;
    z-index: 1;
  }
  .phone_hidden>img{
    width: 165px;
    margin: 10px;
  }
  .nav_list_phone>i{
    width: 10px;
    height: 14px;
    display: inline-block;
    background: url(../../assets/index/resource1.png)-294px -142px;
  }
  .nav_list_more{
    width: 71px;
  }
  .nav_list_more:hover .more_hidden{
    visibility: visible;
  }
  .more_hidden{
    width: 300px;
    height: 164px;
    position: absolute;
    margin-left: -265px;
    visibility: hidden;
    background: white;
    border: 1px solid #CDCDCD;
    z-index: 1;
  }
  .more_hidden li{
    margin-right: 10px;
  }
  .zone,.aboutMe{
    width: 260px;
    height: 60px;
    margin: 15px auto 0;
  }
  .aboutMe{
    padding-top: 10px;
    border-top: 1px dashed black;
  }
</style>
