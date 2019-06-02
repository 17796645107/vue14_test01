<template>
  <div class="UserOrderDetail">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>

    <div class="body">
      <div class="body_main">
        <UserNav></UserNav>
        <div class="order_warp">
          <h2>订单详情</h2>
          <div class="order_detail">
            <h3>订单概况</h3>
            <div class="order_info">
              <div class="order_state">
                <p>
                  订单号：18092410895359
                  <span class="state">状态：<b>已取消</b></span>
                  <span class="create_time">下单时间：2018-09-24 15:48:48</span>
                </p>
                <p class="info">
                  <i></i>您的订单已取消，欢迎您再次购买。
                </p>
              </div>
              <dl class="detail_info">
                <dt>订单金额：</dt><dd class="total">¥337.00</dd>
                <dt>发货仓库：</dt><dd>武汉站</dd>
                <dt>收货信息：</dt><dd>邓宁宁,177*****107,河南省 驻马店市 驿城区 金河街道 黄淮学院</dd>
                <dt>支付方式：</dt><dd>未选择</dd>
                <dt>送货方式：</dt><dd>快递送货上门( 不限时间 送货)</dd>
              </dl>
            </div>
          </div>

          <div class="product_detail">
            <h2>商品清单</h2>
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th>单价</th>
                  <th>优惠</th>
                  <th>数量</th>
                  <th>小计</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="../../../static/product/9638578-438051563145240605-438051563145240694-2_64x64_90.jpg" alt="">
                    <div class="good_info">套头长袖针织衫女2019春季新款修身打底撞色保暖上衣毛衣薄</div>
                    <span class="product_size">M</span>
                  </td>
                  <td>¥99.00</td>
                  <td>-</td>
                  <td>1</td>
                  <td>¥99.00</td>
                </tr>
                <tr>
                  <td>
                    <img src="../../../static/product/9638578-438051563145240605-438051563145240694-2_64x64_90.jpg" alt="">
                    <div class="good_info">套头长袖针织衫女2019春季新款修身打底撞色保暖上衣毛衣薄</div>
                    <span class="product_size">M</span>
                  </td>
                  <td>¥99.00</td>
                  <td>-</td>
                  <td>1</td>
                  <td>¥99.00</td>
                </tr>
                <tr>
                  <td>
                    <img src="../../../static/product/9638578-438051563145240605-438051563145240694-2_64x64_90.jpg" alt="">
                    <div class="good_info">套头长袖针织衫女2019春季新款修身打底撞色保暖上衣毛衣薄</div>
                    <span class="product_size">M</span>
                  </td>
                  <td>¥99.00</td>
                  <td>-</td>
                  <td>1</td>
                  <td>¥99.00</td>
                </tr>
              </tbody>
            </table>
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
      name: "UserOrderDetail",
      components: {
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
        UserNav,
      },
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
    margin-left: 20px;
    margin-bottom: 50px;
    float: left;
  }
  .order_warp>h2{
    height: 20px;
    color: #333;
    padding-left: 10px;
    margin-bottom: 8px;
    border-left: 2px solid #f10582;
    font: 700 14px/1.2 tahoma,arial,Hiragino Sans GB,WenQuanYi Micro Hei,微软雅黑,宋体,sans-serif;
  }
  .order_detail{
    background: white;
  }
  .order_detail>h3{
    padding-left:20px ;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f9f9f9;
  }
  .order_info{
    padding: 24px 20px;
  }
  .order_state{
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px dotted #dcdcdc;
  }
  .state{
    margin-left: 30px;
  }
  .create_time{
    float: right;
  }
  .info{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #dff1f8;
    border: 1px solid #b4e1f3;
    border-radius: 2px;
    margin-top: 5px;
  }
  .detail_info{
    margin-top: 15px;
    line-height: 24px;
  }
  .detail_info dt{
    float: left;
    line-height: 24px;
  }
  .product_detail{
    margin-top: 15px;
    background: white;
    padding-bottom: 30px;
  }
  .product_detail h2{
    padding-left: 20px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f9f9f9;
  }
  .product_detail>table{
    width: 778px;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
  }
  .product_detail>table th:first-child{
    text-align: left;
  }
  .product_detail>table th:nth-child(2){
    width: 100px;
  }
  .product_detail>table th:nth-child(3){
    width: 120px;
  }
  .product_detail>table th:nth-child(4){
    width: 80px;
  }
  .product_detail>table th:nth-child(5){
    width: 100px;
  }
  .product_detail>table>thead{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    color: #999;
  }
  .product_detail>table>tbody>tr{
    border-bottom: 1px dashed #dcdcdc ;
  }
  .product_detail>table>tbody>tr>td{
    padding: 20px 0;
  }
  .product_detail>table>tbody>tr>td:not(:first-child){
    text-align: center;
  }
  .product_detail>table>tbody>tr>td:first-child img{
    float: left;
    width: 67px;
    height: 67px;
    margin-right: 10px;
  }
  .good_info{
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
    overflow: hidden;
  }
  .product_size{
    vertical-align: bottom;
  }
</style>
