<template>
    <nav v-bind:class="{main_nav:true,mainNav_fixed:this.topNavFixed}" id="main_nav">
        <ul>
            <li class="category" @mouseover="primaryCategoryShow = true"
                @mouseout="primaryCategoryShow = false">
                <i></i>商品分类
                <el-collapse-transition>
                    <div class="primaryCategory transition-box" v-show="primaryCategoryShow">
                        <ul>
                            <li v-for="nav in navList" @mouseover="getSecondaryCategory(nav.id)">{{nav.categoryName}}
                            </li>

                        </ul>
                        <div class="secondaryCategory">
                            <a href="javascript:;" v-for="category in secondaryCategory"
                               @click="goCategoryMenu(category.id)">
                                {{category.categoryName}}
                            </a>
                        </div>
                    </div>
                </el-collapse-transition>
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
        data() {
            return {
                nav: "",
                topNavFixed: false,
                secondaryCategory: "",
                primaryCategoryShow:false,
            }
        },
        methods: {
            getNavList: function () {
                fetch("/apis/product/findCategoryByParentId/0", {
                    method: 'get',
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        //存入Session中
                        sessionStorage.setItem("navList", JSON.stringify(data["data"]));
                        this.navList = data["data"];
                    } else {
                        console.log(data["msg"]);
                    }
                })
            },
            goPrimaryCategoryMenu: function (categoryId) {
                this.$router.push({
                    path: "/product/primaryCategory",
                    query: {
                        "categoryId": categoryId,
                    }
                })
            },
            goCategoryMenu: function (categoryId) {
                //子传父
                this.$emit('categoryIdToSecondaryCategory', categoryId);
                this.$router.push({
                    path: "/product/secondaryCategory",
                    query: {
                        "categoryId": categoryId,
                    }
                })
            },
            //查询商品二级分类
            getSecondaryCategory: function (categoryId) {
                let category = JSON.parse(sessionStorage.getItem("SecondaryCategory" + categoryId));
                if (category != null) {
                    this.secondaryCategory = category;
                } else {
                    fetch("/apis/product/findCategoryByParentId/" + categoryId, {
                        method: "get"
                    }).then(result => result.json())
                        .then(data => {
                            if (data["code"] === 200) {
                                this.secondaryCategory = data["data"];
                                sessionStorage.setItem("SecondaryCategory" + categoryId, JSON.stringify(data["data"]));
                            } else {
                                console.log(data["msg"]);
                            }
                        })
                }
            },
        },
        created() {
            //导航栏固定顶部效果
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 1860) {
                    this.topNavFixed = true;
                } else{
                    this.topNavFixed = window.pageYOffset < 1860 && window.pageYOffset > 130;
                }
            });
            //获取导航列表
            if (sessionStorage.getItem("navList") == null) {
                this.getNavList();
            } else {
                this.navList = JSON.parse(sessionStorage.getItem("navList"));
            }
        }
    }
</script>

<style scoped>
    .main_nav {
        width: 100%;
        min-width: 1000px;
        height: 40px;
        background-color: white;
        box-shadow: 0 1px 3px 0 #a7a7a7;
    }

    .main_nav > ul {
        width: 1000px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
    }

    .main_nav > ul > li {
      float: left;
        width: 70px;
        height: 100%;
        text-align: center;
    }

    .main_nav > ul > li > a {
        color: black;
        font-size: 15px;
    }

    .main_nav > ul > li > a:hover {
        color: #f10180;
    }

    .main_nav .super {
        width: 90px;
    }

    .super > img {
        vertical-align: middle;
        padding-right: 2px;
        margin-top: -6px;
    }

    /*导航栏固定顶部效果*/
    .mainNav_fixed {
        top: 0;
        position: fixed;
        z-index: 999;
    }

    .main_nav .category {
        width: 140px;
        height: 100%;
        background: #f10180;
        font-size: 14px;
        color: white;
        cursor: pointer;
    }

    .category > i {
        display: inline-block;
        width: 20px;
        height: 32px;
        background: url("../../assets/product/1536548648745.png");
        vertical-align: middle;
        margin-right: 5px;
    }

    .primaryCategory {
        width: 600px;
        z-index: 999;
        background: white;
        position: absolute;
        overflow: hidden;
    }


    .primaryCategory > ul {
        width: 140px;
        overflow: hidden;
        background: #f10180;
        float: left;
    }

    .primaryCategory > ul > li {
        text-align: center;
        width: 100%;
        height: 45px;
        line-height: 45px;
    }

    .primaryCategory > ul > li:hover {
        background: white;
        color: #f10180;
    }

    .secondaryCategory {
        width: 460px;
        height: 405px;
        background: white;
        font-size: 12px;
        float: right;
    }

    .secondaryCategory > a {
        display: inline-block;
        width: 80px;
        height: 25px;
        color: black;
        margin-right: 10px;
    }
    .secondaryCategory > a:hover{
        color: #f10180;
    }
</style>
