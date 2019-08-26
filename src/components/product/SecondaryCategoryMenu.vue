<template>
    <div class="CategoryMenu">
        <IndexHeadTop></IndexHeadTop>
        <IndexHeadSearch></IndexHeadSearch>
        <IndexHeadNav v-on:categoryIdToSecondaryCategory="getCategoryIdFromHeadNav"></IndexHeadNav>

        <!--内容 -->
        <div class="body">
            <!--商品分类菜单-->
            <div class="menu">
                <div class="select">
                    <dl>
                        <dt>已选</dt>
                        <dd></dd>
                    </dl>
                </div>
                <dl class="menu_sellerIcon">
                    <dt class="seller_dt">品牌</dt>
                    <dd class="sellerIconList">
                        <div class="sellerIconWarp">
                            <a href="" v-for="brand in brandList">
                                <img :src="'../../../static/seller/seller_icon/'+brand.brandIcon" alt="">
                                <i class="seller_name">{{brand.brandName}}</i>
                            </a>
                        </div>
                        <div class="moreIcon"></div>
                    </dd>
                </dl>
                <dl class="category_attr" v-for="attribute in productAttributeAndValue"
                    v-show="attribute.attributeValues.length !== 0">
                    <dt>{{attribute.attrName}}</dt>
                    <dd>
                        <a href="javascript:;" v-for="value in attribute.attributeValues">{{value.value}}</a>
                    </dd>
                </dl>
            </div>

            <!--商品列表-->
            <div class="product_list_warp">
                <div class="product_list_title">
                    <div class="search_param">
                        <ul>
                            <li>综合</li>
                            <li>价格↑</li>
                            <li>折扣</li>
                            <li>
                                <input type="checkbox" name=""/>只看有货商品
                            </li>
                        </ul>
                    </div>
                    <div class="page">
                        <span class="productNum"><b>{{productList.length}}</b>件商品</span>
                        <span>3/4</span>
                        <a href="" class="select_page"><</a>
                        <a href="" class="select_page">下一页</a>
                        <a href="" class="select_page">></a>
                    </div>
                </div>
                <div class="product_list" id="product_list">
                    <div class="product" v-for="product in productList">
                        <a href="javascript:;" @click="goProductDetail(product.defaultImage.productId)"
                           class="product_image">
                            <!--动态拼接src-->
                            <!--单引号包裹的是常量，+号后跟的是变量，拼接起来用双引号包裹   -->
                            <!--:src    Vue标签-->
                            <img :src="'../../../static/product/'+product.defaultImage.image"/>
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
                            <a href="javascript:void(0)" @click="goProductDetail">{{product.title}}</a>
                        </div>
                        <div class="new_product">
                            <img src="../../assets/product/fe509ab1-ec01-4ee8-b053-ed3f2e052c47.png"/>
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
    import IndexHeadSearch from "../index/IndexHeadSearch"
    import IndexHeadNav from "../index/IndexHeadNav"
    import IndexFoot from "../index/IndexFoot"

    export default {
        name: "SecondaryCategoryMenu",
        components: {
            IndexHeadTop,
            IndexHeadSearch,
            IndexHeadNav,
            IndexFoot,
        },
        data() {
            return {
                productList: "",
                brandList: "",
                productAttributeAndValue: "",
                categoryId: "",
            }
        },
        methods: {
            //跳转到视频详情页面
            goProductDetail: function (productId) {
                this.$router.push({
                    path: '/product/productDetail',
                    query: {
                        product_id: productId,
                    },
                })
            },
            getProductByCategoryId: function (categoryId) {
                fetch("/apis/product/getProductByCategoryId/" + categoryId, {
                    method: "get"
                }).then(result => result.json())
                    .then(data => {
                        if (data["code"] === 200) {
                            this.productList = data["data"];
                        } else {
                            alert(data["msg"]);
                        }
                    })
            },
            getBrandByCategoryId: function (categoryId) {
                fetch("/apis/product/getBrandByCategoryId/" + categoryId, {
                    method: "get"
                }).then(result => result.json())
                    .then(value => {
                        if (value["code"] === 200) {
                            this.brandList = value["data"];
                        } else {
                            alert(value["msg"]);
                        }
                    })
            },
            getProductAttributeByCategoryId: function (categoryId) {
                fetch("/apis/product/getProductAttributeByCategoryId/" + categoryId, {
                    method: "get",
                }).then(result => result.json())
                    .then(data => {
                        if (data["code"] === 200) {
                            this.productAttributeAndValue = data["data"];
                        } else {
                            alert(data["msg"]);
                        }
                    })
            },
            //接收子组件传来的值
            getCategoryIdFromHeadNav: function (categoryId) {
                this.categoryId = categoryId;
                this.getProductByCategoryId(categoryId);
                this.getBrandByCategoryId(categoryId);
                this.getProductAttributeByCategoryId(categoryId);
            }
        },
        created() {
            let categoryId = this.$route.query.categoryId;
            this.getProductByCategoryId(categoryId);
            this.getBrandByCategoryId(categoryId);
            this.getProductAttributeByCategoryId(categoryId);
        }
    }
</script>

<style scoped>
    .body {
        width: 1000px;
        margin: 50px auto;
    }

    .menu {
        width: 100%;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
    }

    .menu dt {
        width: 97px;
        padding-left: 20px;
        float: left;
    }

    .menu dd {
        float: left;
    }

    .menu dl {
        overflow: hidden;
    }

    .category_attr {
        height: 36px;
        line-height: 36px;
        border-top: 1px dotted #ccc;

    }

    .select {
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #f5f5f5;
    }

    .menu_sellerIcon {
        width: 100%;
        padding: 10px 0;
    }

    .sellerIconList {
        width: 725px;
    }

    .sellerIconWarp {
        width: 100%;
    }

    .sellerIconWarp > a {
        display: inline-block;
        width: 100px;
        height: 100px;
        text-align: center;
        border: 1px solid #f0f0f0;
    }

    .sellerIconWarp > a > img {
        width: 80px;
        height: 40px;
        margin-top: 30px;
        margin-left: 10px;
    }

    .seller_name {
        display: inline-block;
        vertical-align: top;
        /*visibility: hidden;*/
    }

    .menu_title {
        padding: 10px 30px;
    }

    .menu_title > h2 {
        display: inline;
        margin-right: 20px;
    }

    .menu_title > a {
        display: inline-block;
        padding: 5px 10px;
        float: right;
        border-radius: 15px;
        border: 1px solid #dfdfdf;
        color: #f32b80;
        font-size: 12px;
    }

    .menu_fenLei {
        width: 100%;
        padding-top: 15px;
        border-top: 1px solid rgb(223, 223, 223);
        border-bottom: 1px rgb(223, 223, 223);
        border-bottom-style: dashed;
        overflow: hidden;
    }

    .menu_fenLei > label {
        margin-left: 15px;
    }

    .menu_fenLei > ul {
        width: 730px;
        float: right;
        margin-right: 130px;
        overflow: hidden;
    }

    .menu_fenLei > ul > li {
        padding: 0 27px 12px 0;
    }

    .menu_fenLei > ul > li > a {
        font-size: 12px;
        color: #333;
    }

    .menu_fenLei > ul > li > a:hover {
        color: #f10180;;
    }

    .menu_size {
        width: 100%;
        padding-top: 15px;
        overflow: hidden;
    }

    .menu_size > label {
        margin-left: 15px;
    }

    .menu_size > ul {
        width: 730px;
        float: right;
        margin-right: 130px;
        overflow: hidden;
    }

    .menu_size > ul > li {
        padding: 0 27px 12px 0;
    }

    .menu_size > ul > li > a {
        font-size: 12px;
        color: #333;
    }

    .menu_size > ul > li > a:hover {
        color: #f10180;;
    }

    .product_list_warp {
        width: 100%;
        margin-top: 30px;
    }

    .product_list_title {
        width: 100%;
        height: 48px;
        background-color: #f5f5f5;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
        overflow: hidden;
    }

    .search_param {
        float: left;
        height: 100%;
        overflow: hidden;
    }

    .search_param ul {
        height: 100%;
        overflow: hidden;
    }

    .search_param li {
        width: 78px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #333;
        border-right: 1px solid #dfdfdf;
        cursor: pointer;
    }

    .search_param li:last-child {
        border-right: 0px;
        width: 120px;
    }

    .search_param li:last-child > input {
        vertical-align: middle;
        margin: 0 15px;
    }

    .page {
        height: 100%;
        line-height: 46px;
        float: right;
        margin-right: 20px;
    }

    .productNum {
        margin-right: 20px;
    }

    .productNum > b {
        color: #f10180;;
    }

    .select_page {
        display: inline-block;
        background-color: #fff;
        border: 1px solid #b8b8b8;
        text-align: center;
        vertical-align: middle;
        border-radius: 3px;
        font-family: '\5B8B\4F53', arial, sans-serif;
        color: #848585;
        margin-left: 2px;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        padding: 0 10px 0 9px;
    }

    .product_list {
        width: 100%;
        margin-top: 20px;
        overflow: hidden;
    }

    /*商品*/
    .product {
        width: 235px;
        height: 360px;
        margin: 0 20px 20px 0;
        float: left;
        box-sizing: border-box;
    }

    .product:nth-child(4n) {
        margin-right: 0;
    }

    .product:hover {
        border: 1px solid gainsboro;
    }

    .product_image {
        width: 100%;
        height: 297px;
        display: block;
    }

    .product_image > img {
        width: 100%;
        height: 100%;
    }

    .price {
        margin: 0 10px;
        height: 25px;
    }

    .price > span {
        color: #f10180;
        font-weight: 900;
        font-size: 20px;
    }

    .price > del {
        color: #999;
        font-size: 14px;
        margin-left: 20px;
    }

    .discount {
        float: right;
    }

    .discount > span {
        color: #f1b13b;
        border: 1px solid #f1b13b;
        border-radius: 2px;
        vertical-align: middle;
    }

    .title {
        margin: 10px 10px;
        height: 36px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title > a {
        color: #666;
        font-size: 12px;
    }

    .title > a:hover {
        color: #f32b80;
    }

    .new_product {
        width: 45px;
        height: 45px;
        margin-top: -337px;
        position: relative;
    }

    .new_product > img {
        width: 100%;
        height: 100%;
    }
</style>
