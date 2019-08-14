<template>
  <nav v-bind:class="{main_nav:true,mainNav_fixed:this.topNavFixed}" id="main_nav">
    <ul>
      <li class="category" @mouseover="primaryCategoryShow = !primaryCategoryShow" @mouseout="primaryCategoryShow = false">
        <i></i>商品分类
        <!--一级菜单-->
        <div class="primaryCategory">
          <el-collapse-transition>
            <ul v-show="primaryCategoryShow">
              <li class="transition-box" v-for="nav in navList"
                  @mouseover="getSecondaryCategory(nav.id)" @mouseout="secondaryCategoryShow = false">
                {{nav.categoryName}}
              </li>
            </ul>
          </el-collapse-transition>
        </div>
        <!--二级菜单-->
        <div class="secondaryCategory" v-show="secondaryCategoryShow">
          <a href="javascript:;" v-for="category in secondaryCategory" @click="goCategoryMenu(category.id)">
            {{category.categoryName}}
          </a>
        </div>
      </li>
      <li>
        <a href="/index">首页</a>
      </li>
      <li class="super">
        <img src="../../assets/index/hot.gif"><a href="#">超级预付</a>
      </li>
      <li v-for="nav in navList">
        <a href="javascript:;" @click="goPrimaryCategoryMenu(nav.id)">{{nav.categoryName}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
      name: "IndexHeadNav",
      data(){
        return{
          // 导航分类
          navList:[
            {id:1,categoryName:"AAA"},
            {id:2,categoryName:"AAA"},
            {id:3,categoryName:"AAA"},
            {id:4,categoryName:"AAA"},
            {id:5,categoryName:"AAA"},
            {id:1,categoryName:"AAA"},
            {id:1,categoryName:"AAA"},
            {id:1,categoryName:"AAA"},
            {id:1,categoryName:"AAA"},
          ],
          // 一级菜单淡入淡出控制
          primaryCategoryShow:false,
          // 二级菜单显示控制
          secondaryCategoryShow:false,
          // 导航固定头部控制
          topNavFixed:false,
          // 二级导航
          secondaryCategory:[
            {id:1,categoryName:"A"},
            {id:2,categoryName:"AAaA"},
            {id:3,categoryName:"AAsA"},
            {id:4,categoryName:"AhAA"},
            {id:5,categoryName:"AtfAA"},
            {id:1,categoryName:"AAA"},
            {id:1,categoryName:"AAgA"},
            {id:1,categoryName:"AArA"},
            {id:1,categoryName:"AAeA"},
          ],
        }
      },
      methods:{
        getNavList:function () {
          //查询sessionStorage中是否存在导航信息
          if (sessionStorage.getItem("navList") != null){
            this.navList = JSON.parse(sessionStorage.getItem("navList"));
            return;
          }
          fetch("/apis/product/findCategoryByParentId/0",{
            method:'get',
          }).then(result =>{
            return result.json()
          }).then(data =>{
            if (data["code"] === 200){
              //存入Session中
              sessionStorage.setItem("navList",JSON.stringify(data["data"]));
              this.navList = data["data"];
            } else {
              alert(data["msg"]);
            }
          })
        },
        goPrimaryCategoryMenu:function(categoryId){
          this.$router.push({
            path:"/product/primaryCategory",
            query:{
              "categoryId":categoryId,
            }
          })
        },
        goCategoryMenu:function (categoryId) {
          //子传父
          this.$emit('categoryIdToSecondaryCategory',categoryId);
          this.$router.push({
            path:"/product/secondaryCategory",
            query:{
              "categoryId":categoryId,
            }
          })
        },
        //查询商品二级分类
        getSecondaryCategory: function (categoryId) {
          let category = JSON.parse(sessionStorage.getItem("SecondaryCategory"+categoryId));
          if (category != null){
            this.secondaryCategory = category;
          }else{
            fetch("/apis/product/findCategoryByParentId/"+categoryId,{
              method:"get"
            }).then(result => result.json())
              .then(data =>{
                if (data["code"] === 200){
                  this.secondaryCategory = data["data"];
                  sessionStorage.setItem("SecondaryCategory"+categoryId,JSON.stringify(data["data"]));
                }else{
                  alert(data["msg"]);
                }
              })
          }
          //显示二级菜单
          this.secondaryCategoryShow = true;
        },
      },
      created(){
        //导航栏固定顶部效果
        window.addEventListener('scroll',()=>{
          if(window.pageYOffset>1860){
            this.topNavFixed = true;
          }else{
            this.topNavFixed = window.pageYOffset < 1860 && window.pageYOffset > 130;
          }
        });
        //获取导航列表
        this.getNavList();
      }
    }
</script>

<style scoped>
  .main_nav{
    width: 100%;
    min-width: 1000px;
    height: 40px;
    background-color: #f10180;
  }
  .main_nav>ul{
    width: 1000px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
  }
  .main_nav>ul>li{
    width: 70px;
    height: 100%;
    text-align: center;
  }
  .main_nav>ul>li :hover{
    color: #333333;
    /*background-color: rgba(241,1,128,.5);*/
  }
  .main_nav .super{
    width: 120px;
  }
  .super>img{
    vertical-align: middle;
  }
  .main_nav>ul>li>a{
    color:#fff;
    font-size: 14px;
    font-weight: 600;
  }
  /*导航栏固定顶部效果*/
  .mainNav_fixed{
    top: 0;
    position: fixed;
    z-index: 999;
  }
  .main_nav .category{
    width: 140px;
    height: 100%;
    background: blue;
    font-size: 14px;
    color: white;
    cursor: pointer;
  }
  .category > i{
    display: inline-block;
    width: 20px;
    height: 32px;
    background: url("../../assets/product/1536548648745.png");
    vertical-align: middle;
    margin-right: 5px;
  }
  .primaryCategory{
    width: 140px;
    z-index: 999;
    background: blue;
    position: absolute;
  }
  .primaryCategory>ul{
    width: 100%;
    overflow: hidden;
  }
  .primaryCategory>ul>li{
    text-align: center;
    width: 100%;
    height: 45px;
    line-height: 45px;
  }
  .primaryCategory>ul>li:hover{
    background: white;
    color: blue;
  }
  .primaryCategory>ul>li:hover .secondaryCategory{
    visibility: visible;
  }
  .secondaryCategory{
    padding: 0 30px;
    width: 400px;
    height: 405px;
    position: absolute;
    left: 315px;
    background: white;
    font-size: 12px;
    z-index: 998;
  }
  .secondaryCategory>a{
    display: inline-block;
    width: 80px;
    height: 25px;
    color: black;
    margin-right: 10px;
  }
</style>
