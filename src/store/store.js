import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: '',//储存用户信息
        isLogin: false,//登录状态
        goodCartCount: 0,//购物车数量

    },
    mutations: {
        //登录->保存用户信息
        saveUser(state, user) {
            state.user = user;
            state.isLogin = true;
            //添加到sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            sessionStorage.setItem("isLogin", true);
        },
        //注销,清除用户信息
        userLogout(state) {
            state.user = '';
            state.isLogin = false;
            sessionStorage.removeItem("user");
            sessionStorage.setItem("isLogin", false);
        },
        goodCartCountChange(state,n){
            state.goodCartCount += n;
        }

    },
    getters: {
        //获取用户信息
        getUser: (state) => {
            if (sessionStorage.getItem("isLogin")) {
                state.user = JSON.parse(sessionStorage.getItem("user"));
            }
            return state.user;
        },
        //获取用户登录状态
        getUserState: (state) => {
            if (sessionStorage.getItem("isLogin") == null) {
                return state.isLogin;
            } else {
                state.isLogin = sessionStorage.getItem("isLogin");
                return state.isLogin;
            }
        },
        //获取购物车数量
        getGoodCartCount:state => {
            return state.goodCartCount < 0 ? 0 : state.goodCartCount;
        }

    },
});
