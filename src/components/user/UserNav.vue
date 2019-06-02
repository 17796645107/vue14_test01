<template>
  <!-- 左侧导航 -->
  <nav id="nav">
    <div class="nav_left">
      <dl class="my_deal">
        <dt>
          <i id="nav_deal" title="1"></i>
          <a href="">我的交易</a>
        </dt>
        <dd>
          <a href="/order/orderControl">订单管理</a>
        </dd>
        <dd>
          <a href="">退换/售后</a>
        </dd>
        <dd>
          <a href="/user/address">收货地址</a>
        </dd>
      </dl>
      <dl class="my_asset" >
        <dt>
          <i id="nav_asset" title="1"></i>
          <a href="">我的资产</a>
        </dt>
        <dd>
          <a href="">零钱</a>
        </dd>
        <dd>
          <a href="">唯品金融</a>
        </dd>
        <dd>
          <a href="">银行卡</a>
        </dd>
        <dd>
          <a href="">联名卡</a>
        </dd>
        <dd>
          <a href="">唯品卡</a>
        </dd>
        <dd>
          <a href="">优惠券</a>
        </dd>
        <dd>
          <a href="">唯品币</a>
        </dd>
      </dl>
      <dl class="my_account">
        <dt>
          <i id="nav_account" title="1"></i>
          <a href="">我的账户</a>
        </dt>
        <dd>
          <a href="/user/info">我的资料</a>
        </dd>
        <dd>
          <a href="">分享账户</a>
        </dd>
        <dd>
          <a href="">爱心账户</a>
        </dd>
        <dd>
          <a href="">消息订阅</a>
        </dd>
      </dl>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "UserNav",
    }
</script>

<style scoped>
  /*左侧导航*/
  .nav_left{
    width: 127px;
    background: white;
    border: 1px solid rgb(228,228,228);
    float: left;
  }
  .my_deal{
    width: 107px;
    height: 103px;
    margin: 20px auto;
    border-bottom: 1px dotted #ddd;
  }
  .my_asset{
    width: 107px;
    height: 210px;
    margin: 20px auto ;
    border-bottom: 1px dotted #ddd;
  }
  .my_account{
    width: 107px;
    height: 129px;
    margin: 20px auto;
    border-bottom: 1px dotted #ddd;
  }
  dl>dt>a{
    font-weight: 900;
    color: black;
  }
  dl>dt>i{
    width: 13px;
    height: 13px;
    display: inline-block;
    background: url(../../assets/user/sprites.png)-71px -209px;
    cursor: pointer;
  }
  dl>dd{
    margin-left: 22px;
    height: 27px;
    line-height: 27px;
  }
  dl>dd>a{
    color: #666;
    font-size: 12px;
  }
</style>
