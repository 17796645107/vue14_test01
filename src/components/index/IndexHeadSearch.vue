<template>
    <div class="head_logo">
        <img src="../../assets/index/logo.png"/>
        <img src="../../assets/index/logoService.png"/>

        <div class="goodCart">
            <i></i><a href="javascript:void(0);" @click="goGoodCart">购物车</a>
            <span class="cart_number">{{cartNumber}}</span>
            <div class="goodCart_hidden" v-show="userState && cartNumber !== 0">
                <ul>
                    <li v-for="goodCart in goodCartList">
                        <div class="productImage">
                            <img :src="'../../static/product/'+goodCart.product.defaultImage.image">
                        </div>
                        <div class="productDetail">
                            <div class="productTitle">
                                {{goodCart.product.title}}
                            </div>
                            <div class="colorAndSize">
                                {{goodCart.productColor}} {{goodCart.productSize}}
                            </div>
                        </div>
                        <div class="productPrice">
                            <span>¥{{goodCart.product.price}}</span>X{{goodCart.productNumber}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="search">
            <input type="search" @focus="showSearch" @blur="hideSearch" v-model="search_title" placeholder="大家都在搜：连衣裙"/>
            <a href="javascript:void(0)" @click="searchProduct"></a>
            <div class="search_history" v-show="searchHistoryShow">
                <div class="search_ul">
                    <div class="search_title">
                        搜索历史
                        <i title="清除搜索历史" @mousedown="delete_searchHistory"></i>
                    </div>
                    <ul>
                        <li v-for="search_li in searchHistory">
                            <span>{{search_li}}</span>
                        </li>
                    </ul>
                </div>
                <div class="recommend">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexHeadSearch",
        props: {
            cartNumber: {
                default: 0,
            }
        },
        data() {
            return {
                searchHistory: "",
                searchHistoryShow: false,
                search_title: "",
                goodCartList: "",
                userState: false,//用户登录标记
            }
        },
        computed: {
            //获取用户登录状态
            getUserState() {
                return this.$store.getters.getUserState;
            },
            getUser() {
                return this.$store.getters.getUser;
            },
            getGoodCartCount(){
                return this.$store.getters.getGoodCartCount;
            }
        },
        watch:{
            //监听购物车数量是否发生变化
            cartNumber(){
                console.log("cart number change");
                //更新购物车
                this.getGoodCartList();
            }
        },
        methods: {
            goGoodCart: function () {
                if (this.getUserState === "true") {
                    this.$router.push('/goodCart');
                } else {
                    console.log("请先登录！");
                    this.$router.push('/user/login');
                }
            },
            showSearch: function () {
                this.searchHistoryShow = true;
            },
            hideSearch: function () {
                this.searchHistoryShow = false;
            },
            //搜索商品
            searchProduct: function () {
                /*fetch("/apis/user/searchProduct/",{
                  method:"post",
                  headers:{
                    'Content-Type':'application/json',
                  },
                  body:JSON.stringify({"user_no":this.getUser.user_no,"search_title":this.search_title}),
                }).then(result =>{
                    return result.json()
                  }).then(data =>{
                    if (data["code"] === 200) {
                      this.list_searchHistory();
                      this.search_title = "";
                    }
                    else {
                      console.log(data["msg"]);
                    }
                  })*/
            },
            //展示用户搜索记录
            list_searchHistory: function () {
                let url = "/apis/user/findAllSearchHistory/" + this.getUser.id;
                fetch(url, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.searchHistory = data["data"];
                    } else {
                        console.log(data["msg"]);
                    }
                })
            },
            //是否删除搜索历史记录
            delete_searchHistory: function () {
                let flag = confirm("你确定要删除吗？");
                if (flag === true) {
                    this.delete_search();
                }
            },
            //删除搜索历史记录
            delete_search: function () {
                fetch("/apis/user/deleteSearchHistoryByNo/" + this.getUser.id, {
                    method: "get",
                }).then(result => {
                    return result.json();
                }).then(data => {
                    if (data["code"] === 200) {
                        this.list_searchHistory();
                    } else {
                        console.log("删除失败:" + data["msg"]);
                    }
                })
            },
            //获取购物车列表
            getGoodCartList: function () {
                fetch("/apis/goodCart/getGoodCart/" + this.getUser.id, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.goodCartList = data["data"];
                    } else {
                        console.log(data["msg"]);
                    }
                })
            },
            //获取购物车中的记录数
            getCartCount: function () {
                fetch("/apis/goodCart/getCartCount/" + this.getUser.id, {
                    method: "get",
                }).then(result => {
                    return result.json()
                }).then(data => {
                    if (data["code"] === 200) {
                        this.cartNumber = data["data"];
                        this.$emit("putCartCount", data["data"]);
                    } else {
                        console.log("错误信息:" + data["msg"]);
                    }
                });
            }
        },
        created() {
            //如果用户已经登录,则
            if (this.getUserState === "true") {
                this.list_searchHistory();
                this.getGoodCartList();
                this.getCartCount();
                this.userState = true;
            }
        },
    }
</script>

<style scoped>
    .head_logo {
        width: 1000px;
        height: 100px;
        margin: 0 auto;
    }

    .head_logo > img {
        height: 100px;
    }

    .goodCart {
        width: 94px;
        height: 32px;
        margin-top: 33px;
        float: right;
        border: rgb(204, 204, 204) 1px solid;
        background-color: rgb(246, 247, 249);
    }

    .goodCart:hover .goodCart_hidden {
        visibility: visible;
    }

    .goodCart_hidden {
        width: 300px;
        max-height: 205px;
        position: absolute;
        background: white;
        margin-left: -227px;
        margin-top: 12px;
        border: 1px solid #CDCDCD;
        visibility: hidden;
        padding: 5px 10px;
        /*超过最大高度出现垂直滚动条*/
        overflow: auto;
        z-index: 997;
    }

    .goodCart_hidden > ul {
        overflow: hidden;
    }

    .goodCart_hidden > ul > li {
        overflow: hidden;
        margin-bottom: 5px;
    }

    .goodCart_hidden > ul > li > div {
        float: left;
    }

    .productImage {
        width: 64px;
        height: 64px;
        border: 1px solid green;
        margin-right: 10px;
    }

    .productImage > img {
        width: 100%;
        height: 100%;
    }

    .productDetail {
        width: 130px;
        height: 100%;
    }

    .productTitle {
        width: 100%;
        height: 38px;
        overflow: hidden;
    }

    .colorAndSize {
        color: #999;
    }

    .productPrice {
        width: 50px;
        height: 100%;
        color: #999;
        margin-left: 20px;
    }

    .productPrice > span {
        margin-right: 5px;
        color: black;
    }

    .goodCart > i {
        width: 12px;
        height: 17px;
        display: inline-block;
        top: 8px;
        left: 8px;
        position: relative;
        background: url(../../assets/index/resource1.png) -114px -208px;
    }

    .goodCart > a {
        top: 5px;
        left: 12px;
        position: relative;
        color: black;
    }

    .cart_number {
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        display: inline-block;
        border-radius: 5px;
        background: rgb(240, 5, 129);
        top: 5px;
        right: -15px;
        position: relative;
        color: white;
    }

    .search {
        width: 389px;
        height: 34px;
        margin-top: 33px;
        float: right;
    }

    .search input {
        width: 330px;
        height: 34px;
        border: rgb(250, 42, 131) 1px solid;
    }

    .search_history {
        width: 380px;
        height: 220px;
        position: absolute;
        /*visibility: hidden;*/
        border: rgb(250, 42, 131) 1px solid;
        border-top: 0;
        background: white;
        z-index: 997;
        overflow: hidden;
    }

    .search_title {
        color: #9c9c9c;
        margin: 10px;
    }

    .search_title > i {
        float: right;
        display: inline-block;
        width: 14px;
        height: 13px;
        background: url("../../assets/index/sprites-hash-12f29af9.png") -266px -184px;
        margin-top: 3px;
        cursor: pointer;
    }

    .search_ul {
        width: 190px;
        height: 210px;
        margin-top: 10px;
        float: left;
        border-right: 1px solid gray;
    }

    .search_ul > ul > li {
        width: 100%;
        height: 25px;
        line-height: 25px;
    }

    .search_ul > ul > li > span {
        margin-left: 10px;
    }

    .search_ul > ul > li:hover {
        background: #f32b80;
        color: white;
    }

    .recommend {
        width: 50%;
        height: 100%;
        float: right;
    }

    .search > a {
        width: 52px;
        height: 34px;
        display: inline-block;
        float: right;
        margin-right: 7px;
        background-image: url(../../assets/index/fdj.png);
    }
</style>
