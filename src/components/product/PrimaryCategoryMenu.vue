<template>
  <div class="primaryCategoryMenu">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>

    <div class="banner">
      <img src="../../assets/category/15585747096276.jpg" alt="">
    </div>

    <div class="body">
      <div class="hot_category">
        <div class="category_title">
          <div class="title_line"></div>
          <div class="title_name">
            <img src="../../assets/category/title.png" alt="热门分类">
          </div>
          <div class="title_english">
            Hot category
          </div>
        </div>
        <div class="category_warp">
          <ul>
            <li>
              <a href="">
                <img src="../../assets/category/15223064365045.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223065939326.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064052265.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064851570.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064697447.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223065259294.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064519577.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15066804104346.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064943987.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
            <li>
              <a href="">
                <img src="../../assets/category/15223064277032.jpg" alt="">
                <span>连衣裙</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sellerList">
        <div class="seller_title">
          <img src="../../assets/index/today_DDp.png" alt="">
        </div>
        <div class="seller_warp">
          <div class="seller">
            <img src="../../assets/seller/seller/ias_155780125680915_570x273_90.jpg" alt="">
            <span>收藏品牌</span>
            <div class="seller_title">
              <span></span><span>每周二特惠专场-斯尔丽&瑟俪SIERLI.COLLECTION女装专场</span><span></span>
            </div>
          </div>
          <div class="seller">
            <img src="../../assets/seller/seller/ias_155780125680915_570x273_90.jpg" alt="">
            <span>收藏品牌</span>
            <div class="seller_title">
              <span></span><span>每周二特惠专场-斯尔丽&瑟俪SIERLI.COLLECTION女装专场</span><span></span>
            </div>
          </div>
          <div class="seller">
            <img src="../../assets/seller/seller/ias_155780125680915_570x273_90.jpg" alt="">
            <span class="seller_collect">收藏品牌</span>
            <div class="seller_title">
              <span class="discount">
                <b>3</b>折起
              </span>
              <span class="seller_name">每周二特惠专场-斯尔丽&瑟俪SIERLI.COLLECTION女装专场</span>
              <span class="seller_time">剩22时</span>
            </div>
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
    export default {
      name: "PrimaryCategoryMenu",
      components:{
        IndexHeadTop,
        IndexHeadSearch,
        IndexHeadNav,
        IndexFoot,
      },
    }
</script>

<style scoped>
  .banner{
    width: 100%;
  }
  .banner>img{
    width: 100%;
    height: 360px;
  }
  .body{
    width: 1000px;
    margin: 0 auto;
  }
  .hot_category{
    width: 100%;
    overflow: hidden;
  }
  .category_title{
    padding: 40px 0;
    width: 100%;
    height: 52px;
  }
  .title_line{
    width: 378px;
    height: 1px;
    background-color: #d9d9d9;
    margin-top: 15px;
    margin-left: 22.5%;
    z-index: 1;
    position: absolute;
  }
  .title_name{
    width: 120px;
    height: 30px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
  }
  .title_english{
    font-family: Arial;
    font-size: 12px;
    color: #ccc;
    text-transform: uppercase;
    text-align: center;
  }
  .category_warp{
    width: 100%;
    border: 1px solid #ff6f8a;
    margin-bottom: 40px;
    box-sizing: border-box;
  }
  .category_warp>ul{
    width: 100%;
    overflow: hidden;
  }
  .category_warp>ul>li{
    width: 20%;
    height: 140px;
  }
  .category_warp>ul>li>a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .category_warp>ul>li>a>img{
    width: 100px;
    height: 100px;
    margin-top: 10px;
    margin-left:25% ;
  }
  .category_warp>ul>li>a>span{
    display: block;
    margin-left:40% ;
  }
  .sellerList{
    width: 100%;
  }
  .seller_title{
    width: 100%;
  }
  .seller_title>img{
    width: 100%;
  }
  .seller_warp{
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
  }
  .seller{
    width: 490px;
    height: 275px;
    float: left;
  }
  .seller>img{
    width: 100%;
    height: 235px;
  }
  .seller:nth-child(2n-1){
    margin: 0 20px 20px 0;
  }
  .seller_collect{
    display: inline-block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    border-radius:15px ;
    text-align: center;
    color: #000;
    position: relative;
    left: 400px;
    top: -35px;
    z-index: 2;
    background-color:white;
  }
  .seller_collect:hover{
    color: white;
    background-color: rgb(241,5,130);
  }
</style>
