<template>
    <header>
        <div class="head">
            <div class="logo">
                <a href="">
                    <img src="../../assets/index/logo.png" @click="goIndex"/>
                </a>
            </div>
            <div class="service">
                <img src="../../assets/index/logoService.png">
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "UserHead",
        methods: {
            goIndex: function () {
                this.$router.push("/index");
            }
        }
    }
</script>

<style scoped>
    header {
       width: 100%;
       height: 100px;
     }

    .head {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
    }

    .logo {
      float: left;
    }

    .logo > a > img {
      width: 125px;
    }

    .service {
      float: right;
    }

    .service > img {
      width: 300px;
    }
</style>
