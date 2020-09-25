<!--
    @Author 邓宁
    @Date Created in 17:53 2019/9/3
    @Description
-->
<template>
  <el-container style="width:100%;height: 100%; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu text-color="rgb(191, 203, 217)" @select="handleSelect">
        <el-menu-item index="0" style="width: 100%;">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </template>
        </el-menu-item>
        <!--导航1-->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">商品列表</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--导航2-->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">库存管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">营收管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
            <el-menu-item index="4-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <img src="../../../static/product/0a635061-1875-4869-a873-b8ecd560a4b1.jpg" alt="" class="avatar">
        <span>{{seller.name}}</span>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

    export default {
        name: "index",
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item),
                seller: '',
            }
        },
        methods: {
            handleSelect(key) {
                switch (key) {
                    case '1-1':
                        this.$router.push({
                            path:'/seller/productList',
                            query:{
                                sellerId:this.seller.id
                            }});
                        break;
                    case '1-2':
                        this.$router.push('/Page2');
                        break;
                    case '1-3':
                        this.$router.push('/Page3');
                        break;
                }
            }
        },
        components: {
        },
        computed: {

        },
        created() {
          this.seller = JSON.parse(sessionStorage.getItem("seller"));
        }
    }
</script>

<style scoped>
  .el-aside {
    overflow: hidden;
  }

  .el-menu {
    width: 100%;
    height: 100%;
    background: rgb(48, 65, 86);
  }

  .el-submenu {
    width: 100%;
  }

  .el-menu-item-group {
    background: #1f2d3d !important;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .avatar{
    width: 35px;
    height: 35px;
    vertical-align: middle;
    border-radius: 50%;
  }

</style>
