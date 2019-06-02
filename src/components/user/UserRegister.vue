<template>
<div class="userRegister">

  <!--头部-->
  <user_head></user_head>

  <!--内容-->
  <div class="main">
    <div class="main_warp">
      <div class="register_warp">

        <div class="register_nav">
          <h3>会员注册</h3>
          <span>已注册可<a href="/user/login">直接登录</a></span>
        </div>

        <div class="register_form">
          <!--手机号码-->
          <div class="telephone">
            <i></i><input type="text" v-model="telephone" @blur="checkTelephone" @focus="clearTelephoneMsg" placeholder="请输入手机号码" required="required"/>
          </div>
          <div :class="{telephone_msg:true,red:telephoneRed}"  >{{telephoneError}}</div><!--提示信息-->

          <!--验证码-->
          <div class="code">
            <i></i><input type="text" v-model="validateCode" @blur="checkValidate" placeholder="请输入验证码" required="required">
          </div>
          <input type="button" v-bind:value="buttonContext" @click="sendCode" v-bind:class="{getCode:true,ban:!buttonFlag,notBan:buttonFlag}" v-bind:disabled="!buttonFlag" required="required"/>
          <div :class="{code_msg:true,red:validateCodeRed}">{{validateCodeError}}</div><!--提示信息-->

          <!--密码-->
          <div class="password">
            <i></i><input type="password" v-model="password" @blur="checkPassword" placeholder="密码以字母开头，6-18位，数字和符号组合"/>
          </div>
          <div :class="{password_msg:true,red:passwordRed}">{{ passwordError}}</div><!--提示信息-->

          <!--重复密码-->
          <div class="pwd">
            <i></i><input type="password" v-model="repeatPassword" @blur="checkRepeatPassword" placeholder="请再次输入上面的密码" />
          </div>
          <div :class="{pwd_msg:true,red:repeatPasswordRed}">{{repeatPasswordError}}</div><!--提示信息-->

          <!--用户协议-->
          <div class="read">
            <input type="checkbox" id="user_read" v-model="read" @blur="checkRead"/><label for="user_read">我已阅读并接受以下条款：</label>
            <a href="">《唯品会服务条款》</a>
            <a href="">《隐私条款》</a>
            <a href="">《唯品支付用户服务协议》</a>
            <a href="">《唯品信用服务协议》</a>
          </div>
          <div :class="{read_msg:true,red:readRed}">{{readError}}</div><!--提示信息-->

          <!--提交按钮-->
          <input type="submit" value="立即注册" class="sub_register" @click="register"/>
        </div>
      </div>
    </div>
  </div>

  <!--底部-->
  <user_foot></user_foot>
</div>
</template>

<script>
  import UserHead from "./UserHead"
  import UserFoot from "./UserFoot"

  export default {
    name: "UserRegister",
    data: function(){
      return{
        telephone: "",//手机号码
        telephoneError: "",//提示信息
        telephoneRed:false,
        telephoneFlag:false,//检查手机号码
        validateCode: "",//验证码
        validateCodeError: "",//提示信息
        validateCodeRed:false,
        buttonContext:"发送验证码",//验证码按钮上面显示的文字
        buttonFlag:false,//控制验证码按钮是否能点击
        buttonClick:false,//判断按钮是否被点击过
        password: "",//密码
        passwordError: "",//提示信息
        passwordRed:false,
        repeatPassword: "",//重复密码
        repeatPasswordError: "",//提示信息
        repeatPasswordRed:false,
        read: "",//阅读协议复选框
        readError: "",//提示信息
        readRed:false,
      }
    },
    methods: {
      // 清除提示信息
      clearTelephoneMsg: function(){
        this.telephoneError = "";
      },
      //检查手机号码
      checkTelephone: function () {
        let pattern=/^1[345789]\d{9}$/;//手机号码验证规则:以数字1开头，第二位为3|4|5|7|8,后面9位数字
        //验证失败
        if (!pattern.test(this.telephone)){
          this.telephoneError = "手机号码格式错误，请重新输入";
          this.telephoneFlag = false;
          this.telephoneRed = true;
        }
        else {
          //检查手机号码是否注册过
          fetch("/apis/user/checkTelephone",{
            method:"post",
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({"telephone":this.telephone}),
          }) .then(result =>{
              return result.json();
            }).then(data => {
              //手机号码重复
              if (data["code"] < 0){
                this.buttonFlag = false;//禁用发送验证码按钮
                this.telephoneError = data["msg"];//显示提示信息
                this.telephoneFlag = false;
                this.telephoneRed = true;
              }else {
                this.buttonFlag = true;
                this.telephoneFlag = true;
              }
            })
        }
      },
      //发送手机验证码
      sendCode: function () {
        this.buttonClick = true;//按钮已经被点击过
        this.buttonFlag = false;//禁止点击发送验证码按钮
        //异步跨域请求
        fetch("/apis/user/sendCode",{
          method:"post",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({"telephone":this.telephone})
        }).then(result => {
            return result.json() //解析JSON
        }).then(data =>{
            if (data["code"] < 0) {
              alert(data["msg"]);
            }
          });
        //定义倒计时时间
        let time = 60;
        this.countDown(time);
      },
      //检查验证码
      checkValidate:function(){
        let pattern = /^\d{6}$/;//正则表达式验证规则：6位数字
        //验证失败
        if (!pattern.test(this.validateCode)) {
          this.validateCodeError = "验证码错误";
          this.validateCodeRed = true;
          return false;
        }
        else {
          this.validateCodeError = "";
          return true;
        }
      },
      //检查密码
      checkPassword:function(){
        let pattern = /^[a-zA-Z]\w{5,17}$/;//正则表达式验证规则：以字母开头，长度在6-18之间，只能包含字符、数字和下划线
        if (!pattern.test(this.password)) {
          this.passwordError = "密码格式错误";
          this.passwordRed = true;
          return false;
        }
        else {
          this.passwordError = "";
          return true;
        }
      },
      //检查重复密码
      checkRepeatPassword:function(){
        if (this.password !== this.repeatPassword) {
          this.repeatPasswordError = "两次密码不一致";
          this.repeatPasswordRed = true;
          return false;
        }
        else {
          this.repeatPasswordError = "";
          return true;
        }
      },
      //检查是否同意协议
      checkRead: function(){
        if (this.read === false || this.read === "") {
          this.readError = "接受服务条款才能注册";
          this.readRed = true;
          return false;
        }
        else {
          this.readError = "";
          return true;
        }
      },

      //注册
      register:function () {
        //检查手机号码
        if(!this.telephoneFlag){
          this.checkTelephone();
          return false;
        }
        //检查验证码
        let checkValidateCode = this.checkValidate();
        if (!checkValidateCode) {
          return false;
        }
        //检查验证码按钮是否被点击过
        if (!this.buttonClick) {
          this.validateCodeError = "请输入正确的验证码";
          this.validateCodeRed = true;
          return false;
        }
        //检查密码
        let checkPassword = this.checkPassword();
        if (!checkPassword) {
          return false;
        }
        //检查重复密码
        let checkRepeatPassword = this.checkRepeatPassword();
        if (!checkRepeatPassword) {
          return false;
        }
        //检查阅读协议
        let checkRead = this.checkRead();
        if (!checkRead) {
          return false;
        }
        //发送注册请求
        fetch("/apis/user/register",{
          method:"post",
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          },
          credentials: 'include',//解决Session跨域访问
          body:"telephone="+this.telephone+"&password="+this.password+"&code="+this.validateCode,
        }).then(result =>{
            return result.json();
          }).then(data =>{
            //注册成功
            if (data["code"] > 0) {
              // 自动执行登录操作
              fetch("/apis/user/login",{
                method:"post",
                headers:{
                  "Content-Type":"application/x-www-form-urlencoded"
                },
                body:"telephone="+this.telephone+"&password="+this.password+"&checkBox=false",
              }).then(result =>{
                  return result.json()
                }).then(data =>{
                  if (data["code"] >0){
                    //保存用户登录数据
                    this.$store.commit('saveUser1',data["data"]);
                    //跳转到首页
                    this.$router.push(
                      {
                        path : '/index',
                        replace:true,
                      });
                  }
                })
            }
            else {
              alert(data["msg"]);
            }
          })
      },
      //60s倒计时
      countDown:function (time) {
        let timeDown = window.setInterval(() =>{
          time--;
          if (time > 0){
            this.buttonContext = time + "s后从新发送";
            this.buttonFlag = false;
          }
          else {
            window.clearInterval(timeDown);
            this.buttonContext = "获取验证码";
            this.buttonFlag = true;
          }
        },1000)
      },
    },
    //组件注册
    components: {
      "user_head" : UserHead,
      "user_foot" : UserFoot,
    }
  }
</script>

<style scoped>
  /*动态样式*/
  /*禁止验证码按钮*/
  .ban{
    cursor: not-allowed;
  }
  .notBan{
    cursor: pointer;
  }
  /*提示信息颜色*/
  .red{
    color: red;
  }
  .green{
    color: green;
  }
  /*页面样式*/
  .main{
    width: 100%;
    height: 650px;
    background: url(../../assets/user/15371694140180.jpg)-300px;
  }
  .main_warp{
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    padding-top:50px;
  }
  .register_warp{
    width: 360px;
    height: 100%;
    background: white;
    float: right;
  }
  .register_nav{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgb(224,224,224);
  }
  .register_nav>h3{
    display: inline;
    margin-left: 30px;
  }
  .register_nav>span{
    float: right;
    margin-right: 30px;
  }
  .register_nav a{
    color: #f10180;;
  }
  .register_form{
    width: 300px;
    height: 230px;
    padding-top:40px ;
    margin: 0 auto;
  }
  .telephone,.password,.pwd{
    width: 300px;
    height: 45px;
    border: rgb(178,178,178) solid 1px;
    border-radius: 3px;
    /*margin-bottom: 20px;*/
    box-sizing: border-box;
  }
  .code{
    width: 158px;
    height: 45px;
    border: rgb(178,178,178) solid 1px;
    border-radius: 3px;
    display: inline-block;
    position: absolute;
  }
  .telephone>i,.password>i,.pwd>i,.code>i{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/user/sprites-hash-701a8168.png);
    margin: 11px;
    float: left;
  }
  .telephone>i{
    background-position: -412px -161px;
  }
  .code>i{
    background-position:-436px -161px;
  }
  .password>i,.pwd>i{
    background-position: -388px -161px;
  }
  .getCode{
    width: 132px;
    height: 45px;
    background: rgb(208,208,208);
    border: 0;
    border-radius: 3px;
    margin-left: 170px;
  }
  .telephone>input,.password>input,.pwd>input,.code>input{
    margin-top:7px;
    width: 220px;
    height: 32px;
    line-height: 32px;
    border: 0;
    font-size: 12px;
  }
  .code>input{
    width: 106px;
  }
  .telephone_msg,.code_msg,.password_msg,.pwd_msg{
    width: 300px;
    height: 20px;
  }
  .read{
    width: 100%;
  }
  .read a{
    color: #1d94d1;;
  }
  .sub_register{
    width: 300px;
    height: 45px;
    border: 0;
    border-radius: 3px;
    background: rgb(241,1,128);
    color: white;
    font-size:18px ;
    margin-top: 30px;
    cursor: pointer;
  }
</style>
