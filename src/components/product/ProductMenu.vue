<template>
  <!--
      作者：邓宁宁
      时间：2018-09-25
      描述：商品分类页面
   -->
  <div class="product_menu">
    <IndexHeadTop></IndexHeadTop>
    <IndexHeadSearch></IndexHeadSearch>
    <IndexHeadNav></IndexHeadNav>

    <!--内容 -->
    <div class="body">

      <!--热门商品推荐-->
      <div class="hot_product">
      </div>

      <!--商品分类菜单-->
      <div class="menu">
        <div class="menu_title">
          <h2>{{seller.name}}</h2>
          <strong>2折起</strong>
          <a href="javascript:;" v-if="userIsCollectSeller">已收藏<span>({{sellerCollectNum}})</span></a>
          <a href="javascript:;" v-if="!userIsCollectSeller" @click="collectSeller">收藏品牌<span>({{sellerCollectNum}})</span></a>
        </div>
        <div class="menu_fenLei" id="secondary_list">
          <label>分类：</label>
          <ul>
            <li><a href="">全部分类</a></li>
            <li v-for="secondary in secondaryList">
              <a href="javascript:void(0)" @click="searchProductByCategoryId(secondary.id)">{{secondary.categoryName}}<span>({{secondary.productCount}})</span></a>
            </li>
          </ul>
        </div>
        <div class="menu_size" id="product_size">
          <label>尺码：</label>
          <ul>
            <li><a href="">全部尺码</a></li>
            <li v-for="product_size in productSize">
              <a href="javascript:void(0)" @click="searchProductBySizeId(product_size.id)">{{product_size.size}}</a>
            </li>
          </ul>
        </div>
      </div>

      <!--商品列表-->
      <div class="product_list_warp">
        <div class="product_list_title">
          <div class="search_param">
            <ul>
              <li @click="getProductList">综合</li>
              <li @click="searchProductByType(1)">价格 <i class="el-icon-d-caret"></i></li>
              <li @click="searchProductByType(2)">折扣 <i class="el-icon-d-caret"></i></li>
              <li>
                <input type="checkbox" @click="searchProductByIsHasNum"/>只看有货商品
              </li>
            </ul>
          </div>
          <div class="page">
            <span class="productNum"><b>{{productList.total}}</b>件商品</span>
            <span >{{productList.pageNum}}/{{productList.pages}}</span>
            <a href="" class="select_page"><</a>
            <a href="" class="select_page">下一页</a>
            <a href="" class="select_page">></a>
          </div>
        </div>
        <div class="product_list" id="product_list">
          <div class="product" v-for="product in productList.list">
            <a href="javascript:;" @click="goProductDetail(product.defaultImage.productId)" class="product_image">
              <!--动态拼接src-->
              <!--单引号包裹的是常量，+号后跟的是变量，拼接起来用双引号包裹   -->
              <!--:src    Vue标签-->
              <img :src="'../../../static/product/'+product.defaultImage.image" />
            </a>
            <div class="price">
              <span>￥{{Math.ceil(product.price*0.7)}}</span><!--打折后的价格，向上取整-->
              <del>￥{{product.price}}</del>
              <!--折扣-->
              <div class="discount">
                <span>7折</span>
              </div>
            </div>
            <div class="title">
              <a href="javascript:void(0)" @click="goProductDetail(product.defaultImage.productId)">{{product.title}}</a>
            </div>
            <div class="new_product">
              <img src="../../assets/product/fe509ab1-ec01-4ee8-b053-ed3f2e052c47.png" />
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
    name: "ProductMenu",
    data(){
      return{
        secondaryList:"",
        productList:"",//商品列表
        // productColor:"",
        productSize:"",
        seller:'',//商户信息
        userIsCollectSeller:false,//用户是否关注了该商户
        sellerCollectNum:"",//商户关注度
        productNum:123,
        //商品检索条件
        condition:{
          sellerId: "",//商户ID
          categoryId: "",//分类ID
          sizeId:"",//商品尺寸ID
          type:"",//排序类型
          hasNum:0,//是否还是库存
        },
        categoryIdFlag:false,//是否检索商品分类
        sizeIdFlag:false,//是否检商品尺寸
        typeFlag:false,//是否排序
        hasNumFlag:false,//是否查看有库存的商品
      }
    },
    methods:{
      //跳转到商品详情页面
      goProductDetail:function(productId){
        this.$router.push({
          path:'/product/productDetail',
          query:{
            product_id:productId,
          },
        })
      },
      searchProductByCategoryId:function(categoryId){
        this.condition.categoryId = categoryId;
        this.categoryIdFlag = !this.categoryIdFlag;
        this.getProductList(1);
      },
      searchProductBySizeId:function(sizeId){
        this.condition.sellerId = sizeId;
        this.sizeIdFlag = !this.sizeIdFlag;
      },
      searchProductByType:function(type){
        this.condition.type = type;
      },
      searchProductByIsHasNum:function(){
        this.condition.hasNum = 1;
      },

      //根据商户类型加载商户所有商品的二级分类
      getSecondaryList:function(type,sellerId){
        let url = "/apis/product/findCategoryBySellerId/"+sellerId;
        fetch(url,{
          method:'get',
        }) .then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              this.secondaryList = data["data"];
            }
            else {
              alert(data["msg"]);
            }
          })
      },
      getCategoryIdList:function(categoryList){
        let categoryIdList = categoryList.map(
          category =>{
            return{
              categoryId:category.categoryId
            }
          }
        );
        return categoryIdList;
      },
      /*getProductCountBySecoundaryCategory:function(categoryIdList){
        fetch("/apis/product/getProductCountBySecoundaryCategory",{
          method:"post",
          headers:{
            "Content-Type": "application/x-www-form-urlencoded",//表单提交
          },
          body:"categoryIdList="+categoryIdList
        }).then(result => result.json())
          .then(data =>{
            if (data["code"] === 200){

            } else{
              alert(data["msg"]);
            }
          })
      },*/
      //根据商户类型加载商户所有商品的商品尺寸
      getProductSizeList:function (type) {
        let url = "/apis/product/findAllProductSizeByPrimaryCategoryId/"+type;
        fetch(url,{
          method:'get'
        }) .then(result =>{
            return result.json();
          }).then(data =>{
            if (data["code"] === 200){
              this.productSize = data["data"];
            }else {
              alert(data["msg"]);
            }
          })
      },
      //分页检索商品 pageNum:当前页数
      getProductList:function(pageNum){
        //每页记录数
        let pageCount = 50;
        let url = "/apis/product/listProductInSellerByCondition/" + pageNum + "/" + pageCount;
        fetch(url,{
          method:'post',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              "sellerId" : this.condition.sellerId ,
              "categoryId" : this.condition.categoryId,
              "productSizeId" : this.condition.sizeId,
              "type" : this.condition.type,
              "hasNum" : this.condition.hasNum
          })
        }) .then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"]  === 200){
              this.productList = data["data"];
            }
            else {
              alert(data["msg"]);
            }
          })
      },
      //获取商户信息
      getSeller:function (seller_id) {
        let url = "/apis/seller/getSellerById/"+seller_id;
        fetch(url,{
          method:'get',
        }).then(result =>{
          return result.json()
        }).then(data =>{
          if (data["code"] === 200){
            this.seller = data["data"];
            this.getSecondaryList(data["data"]["type"],seller_id);
            this.getProductSizeList(data["data"]["type"]);
          }
          else {
            alert(data["msg"]);
          }
        })
      },
      //查询用户是否收藏了商户
      selectUserCollectSeller:function (sellerId) {
        fetch("/apis/user/findUserCollectSeller/"+sellerId+"/"+this.$store.getters.getUser.id,{
          method:"get"
        }).then(result => result.json())
          .then(data =>{
            if (data["code"] === 200){
              if (data["data"] === "true"){
                this.userIsCollectSeller = true;
              } else{
                this.userIsCollectSeller = false;
              }
            } else{
              alert(data["msg"]);
            }
          })
      },
      getSellerNum:function (sellerId) {
        fetch("/apis/seller/getSellerCollectNum/"+sellerId,{
          method:"get"
        }).then(result => result.json())
          .then(data =>{
            if (data["code"] === 200){
              this.sellerCollectNum = data["data"];
            } else{
              alert(data["msg"]);
            }
          })
      },
      collectSeller:function () {
        if (this.$store.getters.getUserState !== "true"){
          alert("请先登录");
          this.$router.push("/user/login");
        }
        let url = "/apis/user/collectSeller";
        fetch(url,{
          method:"post",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({
            "userId":this.$store.getters.getUser.id,
            "sellerId":this.$route.query.seller_id
          })
        }).then(Result => Result.json())
          .then(data =>{
            if (data["code"] === 200){
              this.userIsCollectSeller = true;
              this.sellerCollectNum ++;
            }
          })
      },
    },
    created(){
      this.condition.sellerId = this.$route.query.seller_id;
      //查询商户信息
      this.getSeller(this.$route.query.seller_id);
      //查询商品列表
      this.getProductList(1);
      if (this.$store.getters.getUserState === "true"){
        //查询用户是否收藏了该商户
        this.selectUserCollectSeller(this.$route.query.seller_id);
      }
      //查询商户的收藏量
      this.getSellerNum(this.$route.query.seller_id);
    },
    components:{
      IndexHeadTop,
      IndexHeadSearch,
      IndexHeadNav,
      IndexFoot,
    },
  }
</script>

<style scoped>
  .body{
    width: 1000px;
    margin: 50px auto;
  }
  .menu{
    width: 100%;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
  }
  .menu_title{
    padding: 10px 30px;
  }
  .menu_title>h2{
    display: inline;
    margin-right: 20px;
  }
  .menu_title>a{
    display: inline-block;
    padding: 5px 10px;
    float: right;
    border-radius:15px;
    border: 1px solid #dfdfdf;
    color: #f32b80;
    font-size: 12px;
  }
  .menu_fenLei{
    width: 100%;
    padding-top: 15px;
    border-top: 1px solid rgb(223,223,223);
    border-bottom: 1px  rgb(223,223,223);
    border-bottom-style: dashed;
    overflow: hidden;
  }
  .menu_fenLei>label{
    margin-left: 15px;
  }
  .menu_fenLei>ul{
    width: 730px;
    float: right;
    margin-right: 150px;
    overflow: hidden;
  }
  .menu_fenLei>ul>li{
    padding: 0 27px 12px 0;
  }
  .menu_fenLei>ul>li>a{
    font-size: 12px;
    color: #333;
  }
  .menu_fenLei>ul>li>a:hover{
    color: #f10180;;
  }
  .menu_size{
    width: 100%;
    padding-top: 15px;
    overflow: hidden;
  }
  .menu_size>label{
    margin-left: 15px;
  }
  .menu_size>ul{
    width: 730px;
    float: right;
    margin-right: 150px;
    overflow: hidden;
  }
  .menu_size>ul>li{
    padding: 0 27px 12px 0;
  }
  .menu_size>ul>li>a{
    font-size: 12px;
    color: #333;
  }
  .menu_size>ul>li>a:hover{
    color: #f10180;;
  }
  .product_list_warp{
    width: 100%;
    margin-top: 30px;
  }
  .product_list_title{
    width: 100%;
    height: 48px;
    background-color: #f5f5f5;
    border: 1px solid #dfdfdf;
    box-sizing: border-box;
    overflow: hidden;
  }
  .search_param{
    float: left;
    height: 100%;
    overflow: hidden;
  }
  .search_param ul{
    height: 100%;
    overflow: hidden;
  }
  .search_param li{
    width: 78px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #333;
    border-right: 1px solid #dfdfdf;
    cursor: pointer;
  }
  .search_param li:last-child{
    border-right: 0px;
    width: 120px;
  }
  .search_param li:last-child>input{
    vertical-align: middle;
    margin: 0 15px;
  }
  .page{
    height: 100%;
    line-height: 46px;
    float: right;
    margin-right: 20px;
  }
  .productNum{
    margin-right: 20px;
  }
  .productNum>b{
    color: #f10180;;
  }
  .select_page{
    display: inline-block;
    background-color: #fff;
    border: 1px solid #b8b8b8;
    text-align: center;
    vertical-align: middle;
    border-radius: 3px;
    font-family: '\5B8B\4F53',arial,sans-serif;
    color: #848585;
    margin-left: 2px;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    padding: 0 10px 0 9px;
  }
  .product_list{
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
  }
  /*商品*/
  .product{
    width: 235px;
    height: 360px;
    margin: 0 20px 20px 0;
    float: left;
    box-sizing: border-box;
  }
  .product:nth-child(4n){
    margin-right: 0;
  }
  .product:hover{
    border: 1px solid gainsboro;
  }
  .product_image{
    width: 100%;
    height: 297px;
    display: block;
  }
  .product_image>img{
    width: 100%;
    height: 100%;
  }
  .price{
    margin: 0 10px;
    height: 25px;
  }
  .price>span{
    color:#f10180;
    font-weight: 900;
    font-size: 20px;
  }
  .price>del{
    color: #999;
    font-size: 14px;
    margin-left: 20px;
  }
  .discount{
    float: right;
  }
  .discount>span{
    color: #f1b13b;
    border: 1px solid #f1b13b;
    border-radius: 2px;
    vertical-align: middle;
  }
  .title{
    margin: 10px 10px;
    height: 36px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .title>a{
    color:#666 ;
    font-size: 12px;
  }
  .title>a:hover{
    color: #f32b80;
  }
  .new_product{
    width: 45px;
    height: 45px;
    margin-top: -337px;
    position: relative;
  }
  .new_product>img{
    width: 100%;
    height: 100%;
  }

</style>
