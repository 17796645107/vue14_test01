<!--
    @Author 邓宁
    @Date Created in 17:53 2019/9/3
    @Description
-->
<template>
    <div class="index">
        <div class="left">
            <el-menu text-color="rgb(191, 203, 217)">
                <el-menu-item style="padding-left: 20px;">
                    <i class="el-icon-house" style="padding-right: 5px;"></i>主页
                </el-menu-item>
                <!--导航1-->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-apple"></i>
                        <span slot="title">商品</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!--导航1-->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航1</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!--导航1-->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航1</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main">
            <div class="nav">
                <navbar></navbar>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from "../common/navbar";
    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {},
        components:{
            navbar,
        },
        computed:{
            routes() {
                return this.$router.options.routes
                console.log(routes)
            },
        },
    }
</script>

<style scoped>
    .left{
        width:200px;
        float: left;
    }
    .el-menu{
        width: 100%;
        background:  rgb(48, 65, 86);
    }
    .el-submenu{
        width: 100%;
    }
    .el-menu-item-group{
        background: #1f2d3d !important;
    }
    .main{
        float: right;
    }
</style>