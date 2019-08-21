<template>
  <div class="user_index">
    <!--头部-->
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
<!--    <IndexHeadNav></IndexHeadNav>-->
    <UserTopNav></UserTopNav>
    <!--页面主体 -->
    <div class="body">
      <div class="user_warp">

        <UserNav></UserNav>

        <!--主界面-->
        <div class="frame_right" id="frame">
          <div class="user_message">
            <div class="message_top">
              <div class="information">
                <div class="head_image">
                  <a href="">
                    <img :src="'../../../static/user/headIcon/'+user.headImage" v-show="user.headImage !== ''">
                    <img src="../../assets/user/avatar_89373029_1496285287409.jpg" v-show="user.headImage === ''">
                  </a>
                </div>
                <div class="user_context">
                  <div class="context_title">
                    <strong>
                      {{user.nickname}}
                      <!--字符串截取,拼接加密用户手机-->
                      ({{user.telephone.substring(0,3)}}*****{{user.telephone.substring(8,11)}})
                    </strong>
                    <i></i>
                    <span>上午好！</span><br>
                  </div>
                  <div class="context_complete">
                    <span>资料完整度：</span>
                    <a href=""><i>50%</i></a>
                    <a href="">立即完善</a><br>
                  </div>
                  <div class="context_safe">
                    <span>账户安全级别:</span>
                    <span>低</span>
                    <i></i>
                    <a href=""></a>
                    <a href=""></a>
                    <a href="">立即提示</a>
                  </div>
                </div>
              </div>
              <div class="news">
                <h3><a href="">我的消息</a></h3>
                <p>	哎呀，没有新消息了</p>
              </div>
            </div>
            <div class="message_context">
              <div class="context_card">

              </div>
              <div class="context_total">

              </div>
            </div>
          </div>
          <div class="user_message_bottom"></div>
          <div class="user_order">
            <!--<div class="order_title">
              <ul>
                <li>
                  <a href="">全部订单</a>
                </li>
                <li>
                  <a href="">待支付</a>
                </li>
                <li>
                  <a href="">待收货</a>
                </li>
              </ul>
            </div>
            -->
            <el-tabs v-model="el_tab_select">
              <el-tab-pane label="全部订单" name="first">
                <div class="order_main">
                  <table v-show="orderList.list > 0">
                    <tr v-for="order in orderList.list">
                      <td ><img :src="'../../../static/product/'+order.goodCartList[0].product.defaultImage.image"> </td>
                      <td>
                        <p>订单号:{{order.id}}</p>
                        <p>{{order.created}}</p>
                      </td>
                      <td>¥{{order.productTotal}}</td>
                      <td>订单已取消</td>
                      <td><a href="">查看详情</a></td>
                    </tr>
                  </table>
                  <div class="orderNone_hidden" v-show="!orderList.list > 0">
                    <div class="order_hidden_img"></div>
                    <p>
                      当前没有订单哦，先去 <a href="">抢购</a>吧~
                    </p>
                  </div>
                  <div class="all_order" v-show="orderList.total > 3">
                    <a href="/order/orderControl">查看所有订单</a>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待支付" name="second">
                <div class="order_main"></div>
              </el-tab-pane>
              <el-tab-pane label="待收货" name="third">
                <div class="order_main"></div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="user_collect">
            <div class="collect_title">
              <ul>
                <li>
                  <i></i>
                  <a href="">我收藏的品牌</a>
                </li>
                <li>
                  <a href="">正在特卖</a>
                </li>
                <li>
                  <a href="">即将特卖</a>
                </li>
              </ul>
            </div>
            <div class="collect_main">

            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部-->
    <IndexFoot></IndexFoot>
  </div>

</template>

<script>
  import IndexHeadTop from "../index/IndexHeadTop"
  import IndexHeadSearch from  "../index/IndexHeadSearch"
  import IndexHeadNav from "../index/IndexHeadNav"
  import IndexFoot from "../index/IndexFoot"
  import UserNav from "../user/UserNav"
  import UserTopNav from "./UserTopNav";

  export default {
    name: "UserIndex",
    data(){
      return{
          user:"",
          orderList:"",
          el_tab_select:"first",
      }
    },
    methods:{
      //展示订单列表前4条
      getOrderTop4(userId){
        fetch("/apis/order/getOrderByUserID/"+userId,{
          method:"get"
        }).then(result =>{
          return result.json()
        }).then(data =>{
          if (data["code"] === 200){
            this.orderList = data["data"];
          } else{
            alert(data["msg"]);
          }
        });
      }
    },
    created(){
      //如果用户没有登录则跳转到登录页面
      if (this.$store.getters.getUserState === "true"){
        this.user = this.$store.getters.getUser;
        this.getOrderTop4(this.$store.getters.getUser.id);
      }else {
        this.$router.push("/user/login");
      }
    },
    components:{
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
        UserNav,
        UserTopNav,
    }
  }
</script>

<style scoped>
  .body{
    width: 100%;
    background: url(../../assets/user/layout-bg.png)no-repeat center 0 rgb(245,246,248);
  }
  .user_warp{
    width: 1000px;
    height: 925px;
    margin: 0 auto;
    padding-top: 30px;
    overflow: hidden;
  }
  .frame_right{
    width: 820px;
    height: 900px;
    padding-left: 20px;
    float: left;
  }
  .user_message{
    width: 780px;
    height: 228px;
    padding: 20px 20px 0 20px;
    background: white;
  }
  .message_top{
    width: 100%;
    height: 100px;
  }
  .news{
    width: 295px;
    height: 100%;
  }
  .message_context{
    width: 100%;
    height: 100px;
    overflow: hidden;
  }
  .information{
    width:530px;
    height:100px;
    float:left;
  }
  .head_image{
    width: 92px;
    height: 92px;
    float: left;
  }
  .head_image>a>img{
    width:100%;
    height:100%;
  }
  .user_context{
    width: 300px;
    height: 93px;
    float: left;
    margin-left: 20px;
    font-size: 14px;
  }
  .user_context>div{
    width: 100%;
    height: 31px;
    line-height: 31px;
    font-size: 14px;
  }
  .context_title>strong{
    font-size: 15px;
  }
  .context_title>i{
    width: 25px;
    height: 25px;
    display: inline-block;
    background: url(../../assets/user/i-level-small.png)no-repeat transparent 4px 2px;
    vertical-align: text-bottom;
  }
  .context_title>span{
    font-size: 14px;
    color:#666;
  }
  .context_complete>a{
    font-size: 12px;
    color: #000000;
  }
  .context_complete>a:hover{
    color: rgb(160,197,232);
  }
  .context_complete>a:nth-child(2){
    width: 100px;
    height: 12px;
    display: inline-block;
    background: #ddd;
    vertical-align: middle;
  }
  .context_complete>a:nth-child(2)>i{
    width: 50px;
    height: 12px;
    display: block;
    line-height: 12px;
    text-align: center;
    font-size: 12px;
    background: rgb(240, 148, 18);
    color: white;
  }
  .context_safe>span:nth-child(2){
    color:red;
  }
  .context_safe>i:nth-child(3){
    width: 12px;
    height: 12px;
    display: inline-block;
    background: url(../../assets/user/i-warning-12px.png) center;
  }
  .context_safe>a:nth-child(4){
    width: 10px;
    height: 16px;
    display: inline-block;
    background: url(../../assets/user/psw_reset.png)-2px -2px;
    vertical-align: middle;
    /*-56px -2px;*/
  }
  .context_safe>a:nth-child(5){
    width: 10px;
    height: 16px;
    display: inline-block;
    background: url(../../assets/user/psw_reset.png)-56px -2px;;
    vertical-align: middle;
  }
  .context_safe>a:nth-child(6){
    margin-left: 26px;
    font-size: 12px;
    color: #000000;
  }
  .context_safe>a:nth-child(6):hover{
    color: rgb(160,197,232);
  }
  .news{
    width: 219px;
    height: 100px;
    float: left;
    padding-left: 30px;
    border-left: 1px dashed rgb(235,235,235);
  }
  .news>h3>a{
    color:#000;
  }
  .news>p{
    margin-top: 10px;
    color: #666;
    font-size: 12px;
  }

  .message_context{
    width: 778px;
    height: 85px;
    margin: 30px  auto 10px;
    background: rgb(245,248,249);
  }

  .user_message_bottom{
    width: 820px;
    height: 5px;
    background: url(../../assets/user/userInfotop_bg_new.png)repeat-x;
  }
  .user_order{
    width: 800px;
    margin-top: 20px;
    background: white;
    padding: 0 10px;
  }
  .order_title,.collect_title{
    width: 820px;
    height: 47px;
    background: rgb(249,249,249);
    border: 1px solid  rgb(236,236,236);
    box-sizing: border-box;
  }
  .order_title>ul{
    width: 270px;
    height: 47px;
    line-height: 47px;
    margin-left: 30px;
  }
  .order_title>ul>li{
    width: 75px;
    height: 100%;
    margin-right: 15px;
  }
  .order_title li>a{
    font-size:14px ;
    color: #999;
  }
  .order_title li>a:hover{
    color: rgb(160,197,232);
  }
  .order_main{
    width: 100%;
    min-height: 200px;
  }
  .order_main>table{
    width: 100%;
    padding: 15px;
  }
  .order_main>table>tr{
    height: 87px;
  }
  .order_main>table>tr img{
    width: 67px;
    height: 67px;
  }
  .orderNone_hidden{
    padding-top: 50px;
    text-align: center;
  }
  .order_hidden_img{
    width: 100px;
    margin: 0 auto;
    height: 100px;
    background: url("../../assets/user/index-img.png")no-repeat scroll -179px -70px;
  }
  .all_order{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-top: 1px #ececec solid;
    cursor: pointer;
  }
  .all_order a{
    color: #999;
  }
  .all_order a:hover{
    color: #1d94d1;
  }
  .user_collect{
    width: 100%;
    background: white;
  }
  .collect_title ul{
    width: 320px;
    height: 47px;
    margin-left: 30px;
  }
  .collect_title ul>li{
    width: 75px;
    height: 47px;
    line-height: 47px;
    margin-right: 15px;
  }
  .collect_title ul>li:nth-child(1){
    width: 120px;
  }
  .collect_title ul>li:nth-child(1)>i{
    width: 2px;
    height: 14px;
    display: inline-block;
    background: #f10180;
  }
  .collect_title ul>li>a{
    font-size:14px ;
    color: #999;
  }
  .collect_title ul>li>a:hover{
    color: rgb(160,197,232);
  }
</style>
