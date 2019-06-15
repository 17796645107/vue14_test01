<template>
  <el-container>
    <el-header height="35px" class="top">
      <el-row>
        <el-col :span="2">
          <i class="el-icon-mobile-phone"></i>卖家手机端
        </el-col>
        <el-col :span="2">
          <a href="javascript:;" class="username">忧郁忧郁111</a>
          <a href="javascript:;" class="logout">,退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-header class="header">
        <el-row>
          <el-col :span="3">
            <b class="logo">唯品会</b>卖家工作台
          </el-col>
        </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu unique-opened="true" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>交易管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">已卖出的商品</el-menu-item>
              <el-menu-item index="1-2">评价管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>营销中心</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">我要推广</el-menu-item>
              <el-menu-item index="2-2">店铺营销工具</el-menu-item>
              <el-menu-item index="2-3">天天特价</el-menu-item>
              <el-menu-item index="2-4">客户运营平台</el-menu-item>
              <el-menu-item index="2-5">拼团</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>物流管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">发货</el-menu-item>
              <el-menu-item index="3-2">等待发货的订单</el-menu-item>
              <el-menu-item index="3-3">发货中的订单</el-menu-item>
              <el-menu-item index="3-4">已发货的订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">发布商品</el-menu-item>
              <el-menu-item index="4-2">已出售的商品</el-menu-item>
              <el-menu-item index="4-3">仓库中的商品</el-menu-item>
              <el-menu-item index="4-4">我的产品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>店铺管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">查看淘宝店铺</el-menu-item>
              <el-menu-item index="5-2">商品分类管理</el-menu-item>
              <el-menu-item index="5-3">店铺基本设置</el-menu-item>
              <el-menu-item index="5-4">店铺经营许可</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "SellerMain",
      data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518'
        };
        return {
          tableData: Array(5).fill(item)
        }
      }
    }
</script>

<style scoped>
  .el-container{
    min-height: 500px;
  }
  .top{
  background: #f6f6f6;
  border-bottom: 1px solid #f0f0f0;
  }
  .top > .el-row{
   height: 35px;
   line-height: 35px;
  }
  .header{
  background-image: linear-gradient(90deg,#4574f1 0,#00abf3);
  color: #333;
  }
  .header > .el-row{
    height: 60px;
    line-height: 60px;
  }
  .el-aside {
  color: #333;
  }
  .logo{
  font-size: 20px;
  /*font-weight: 900;*/
  }
  .el-submenu{
    width: 200px;
  }

</style>
