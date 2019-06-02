<template>
    <div class="OrderControl">
      <IndexHeadTop></IndexHeadTop>
      <IndexHeadSearch></IndexHeadSearch>
      <IndexHeadNav></IndexHeadNav>

      <div class="body">
        <div class="body_main">
          <UserNav></UserNav>
          <div class="order_warp">
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th>订单总额</th>
                  <th>全部订单状态</th>
                  <th>操作</th>
                  <th>其他操作</th>
                </tr>
              </thead>
              <tbody class="order_context" v-for="order in orderList.list">
                <tr class="order_top"></tr>
                <tr class="order_head">
                  <td colspan="4">
                    <i></i>
                    订单号：{{order.order_id}}
                    唯品会自营</td>
                  <td>{{order.created}}</td>
                </tr>
                <tr class="order_detail" v-for="(detail,index) in order.goodCartList">
                  <td>
                    <img :src="'../../../static/product/'+detail.product.default_image.image" alt="">
                    <div class="order_product">
                      <p>{{detail.product.title}}</p>
                      <p>{{detail.product_color}} {{detail.product_size}}</p>
                    </div>
                  </td>
                  <td v-show="index === 0" :rowspan="order.goodCartList.length"><strong>¥{{order.product_total}}</strong></td>
                  <td v-show="index === 0" :rowspan="order.goodCartList.length">
                    <p><strong>已取消</strong></p>
                    <p><a href="">订单详情</a></p>
                  </td>
                  <td v-show="index === 0" :rowspan="order.goodCartList.length">再次购买</td>
                  <td  v-show="index === 0" :rowspan="order.goodCartList.length">
                    <a href="javascript:;" @click="deleteOrderByNo(no)">删除订单</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="page">
              <ul>
                <li :class="{ban:orderList.isFirstPage,notBan:!orderList.isFirstPage}"
                    @click="getOrderPageByUserID(orderList.list[0].user_id,orderList.prePage)"><</li>
                <li v-for="index in orderList.pages"
                    :class="{now:orderList.pageNum === index,notBan:!(orderList.pageNum === index)}"
                    @click="getOrderPageByUserID(orderList.list[0].user_id,index)">
                  {{index}}
                </li>
                <li :class="{ban:orderList.isLastPage,notBan:!orderList.isLastPage}"
                  @click="getOrderPageByUserID(orderList.list[0].user_id,orderList.nextPage)">></li>
              </ul>
              <span>共{{orderList.pages}}页</span>
            </div>

          </div>
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
  import UserNav from "../user/UserNav"
    export default {
      name: "OrderControl",
      components: {
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
        UserNav,
      },
      data(){
        return{
          orderList:"",
        }
      },
      methods:{
        a:function(){
          alert("aaa");
        },
        getOrderPageByUserID:function (userId,page) {
          if (page === 0){
            return;
          }
          fetch("/apis/order/getOrderByUserID/"+userId,{
            method:"post",
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            },
            body:"page="+page
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 1){
              this.orderList = data["data"];
            } else {
              alert(data["msg"]);
            }
          })
        },
        deleteOrderByNo:function (no) {

        }
      },
      mounted(){
        if (this.$store.getters.getUserState === "true"){
          this.getOrderPageByUserID(this.$store.getters.getUser.user_id,1);
        } else {
          this.$router.push("/user/login");
        }
      }
    }
</script>

<style scoped>
  .body{
    width: 100%;
    background: url(../../assets/user/layout-bg.png)no-repeat center 0 rgb(245,246,248);
  }
  .body_main{
    width: 1000px;
    margin: 0 auto;
    padding-top: 30px;
    overflow: hidden;
  }
  .order_warp{
    width: 820px;
    min-height: 600px;
    margin-left: 20px;
    margin-bottom: 50px;
    float: left;
  }
  table{
    width: 100%;
    border: 1px solid #eaeaea;
    border-collapse: collapse;
  }
  thead{
    height: 40px;
    background-color: #f9f9f9;
    color: #333;
    border: 1px solid #eaeaea;
  }
  .order_top{
    height: 10px;
  }
  .order_head{
    height: 40px;
    background-color: #f9f9f9;
    color: #333;
    border: 1px solid #eaeaea;
  }
  .order_head>td:first-child{
    border-left: 2px solid #fb47a8;
    padding-left: 6px;
  }
  .order_head i{
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url("../../assets/order/sprite.png") -198px -205px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .order_detail{
    height: 100px;
    background: white;
    color: black;
    overflow: hidden;
    border-bottom: 1px solid #eaeaea;
  }
  .order_detail>td:not(:last-child){
    padding: 16px 2px 16px 16px;
    border-right:2px solid rgb(234,234,234);
  }
  .order_detail>td:first-child{
    padding: 16px 2px 16px 16px;
    border-right:2px solid rgb(234,234,234);

  }
  .order_detail>td:last-child{
    text-align: center;
  }
  .order_detail>td:first-child{
    text-align: left;
  }
  .order_detail img{
    width: 50px;
    height: 63px;
    border: 1px solid #eaeaea;
    float: left;
  }
  .order_product{
    float: left;
    margin-left: 20px;
    margin-top: 5px;
  }
  .order_product>p:first-child{
    max-width: 300px;
    height: 40px;
  }
  .page{
    width: 100%;
    height: 34px;
    margin: 30px 0;
  }
  .page>span{
    display: inline-block;
    height: 33px;
    line-height: 33px;
    float: right;
  }
  .page>ul{
    float: right;
    height: 100%;
    overflow: hidden;
  }
  .page>ul>li{
    width: 32px;
    height: 32px;
    line-height: 32px;
    border:1px solid #dbdbdb;
    margin-left: 10px;
    text-align: center;
    border-radius: 3px;
  }
  .ban{
    cursor: not-allowed;
    background-color: #fafafa;
    color: #d1d1d1;
    border-color:#dbdbdb;
  }
  .notBan{
    cursor: pointer;
  }
  .now{
    background-color: #f22a80;
    color: #fff;
    border:1px solid #dbdbdb;
  }
</style>
