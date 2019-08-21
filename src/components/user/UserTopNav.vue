<!--
    @Author 邓宁
    @Date Created in 14:44 2019/8/21
    @Description
-->
<template>
    <div class="UserTopNav">
      <nav>
        <div class="main_nav">
          <div class="nav_auto_center">
            <ul>
              <li><a href="">我的唯品会</a></li>
              <li><a href="">安全中心</a></li>
              <li class="nav_category"><a href="">分类</a></li>
              <li class="nav_comingsoon"><a href="">预告</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

</template>

<script>
    export default {
        name: "UserTopNav",

    }
</script>

<style scoped>
  nav{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f10180;
    font-size: 14px;
  }
  .main_nav{
    width: 100%;
    height: 100%;
  }
  .nav_auto_center{
    width: 1000px;
    margin: 0 auto;
  }
  .nav_auto_center > ul > li{
    padding: 0 10px;
  }
  .nav_auto_center > ul a{
    color: white;
    font-size: 16px;
    font-weight: 600;
  }
  .nav_category,.nav_comingsoon{
    float: right;
  }
</style>
