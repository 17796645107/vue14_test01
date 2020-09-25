<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style>

    *{
      margin: 0;
      padding: 0;
    }
    body{
      min-width: 1000px;
      height: 100%;
      font: 12px/1.5 tahoma,arial,
      Hiragino Sans GB,WenQuanYi Micro Hei,\5FAE\8F6F\96C5\9ED1,\5B8B\4F53,sans-serif;
    }
    li{
      /*float: left;*/
      list-style: none;
    }
    a{
      text-decoration: none;
    }
  #app{
    width: 100%;
    height: 100%;
  }
</style>
