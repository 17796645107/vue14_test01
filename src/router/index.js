import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Index from '../components/index/Index'
import UserRegister from '../components/user/UserRegister'
import UserLogin from '../components/user/UserLogin'
import UserIndex from '../components/user/UserIndex'
import UserInfo from '../components/user/UserInfo'
import UserAddress from '../components/user/UserAddress'
import ProductMenu from '../components/product/ProductMenu'
import ProductDetail from '../components/product/ProductDetail'
import GoodCart from '../components/goodCart/goodCart'
import OrderDetail from '../components/order/OrderDetail'
import PayMethods from '../components/payment/PayMethods'
import OrderControl from '../components/order/OrderControl'
import UserOrderRetail from '../components/user/UserOrderDetail'
import SecondaryCategoryMenu from '../components/product/SecondaryCategoryMenu'
import PrimaryCategoryMenu from '../components/product/PrimaryCategoryMenu'
import SellerLogin from '../components/seller/SellerLogin'
import SellerMain from '../components/seller/SellerMain'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      component: HelloWorld
    },
    {
      path:'/index',
      component:Index
    },
    {
      path:'/user/register',
      component:UserRegister
    },
    {
      path:'/user/login',
      component:UserLogin
    },
    {
      path:'/',
      component:Index
    },
    {
      path:'/user/index',
      component:UserIndex
    },
    {
      path:'/product/productMenu',
      name:'ProductMenu',
      component:ProductMenu
    },
    {
      path:'/product/productDetail',
      name:'ProductDetail',
      component:ProductDetail
    },
    {
      path:'/goodCart',
      component:GoodCart,
    },
    {
      path:'/order/orderDetail',
      name:'OrderDetail',
      component:OrderDetail
    },
    {
      path:'/pay/payMethods',
      component:PayMethods
    },
    {
      path:'/user/info',
      component:UserInfo
    },
    {
      path:"/user/address",
      component:UserAddress,
    },
    {
      path:"/order/orderControl",
      component:OrderControl
    },
    {
      path:"/user/orderDetail",
      component:UserOrderRetail
    },
    {
      path:"/product/secondaryCategory",
      component:SecondaryCategoryMenu
    },
    {
      path:"/product/primaryCategory",
      component:PrimaryCategoryMenu
    },
    {
      path:"/seller/login",
      component:SellerLogin
    },
    {
      path:"/seller/main",
      component:SellerMain
    },
  ],
  mode:"history",
})
