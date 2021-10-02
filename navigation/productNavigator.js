import {View} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {createAppContainer,createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsScreen from '../screen/shop/productsOverview';
import ProductDetail from '../screen/shop/productDetail';
import CartScreen from '../screen/shop/cart';
import WishList from '../screen/shop/whishList';
import Profile from '../screen/user/profile';
import OrderHistory from '../screen/user/orderHistory';
import SignIn from '../screen/auth/signin';
import SignUp from '../screen/auth/singnup';
import Shipping from '../screen/user/shipping';
import PlaceOrder from '../screen/user/placeOrder';
import Payment from '../screen/user/payment';
import PaymentGateWay from '../screen/user/paymentGateWay';
import OrderSummary from '../screen/user/orderSummary';
import OrderDetails from '../screen/user/orderDetails';

const stackProductNavigator=createStackNavigator({
    Products:ProductsScreen,
    OverView:ProductDetail,
    Basket:CartScreen,
    WishList,
    Profile,
    OrderSummary,
    SignIn:{
        screen:SignIn,
        navigationOptions:{
            headerLeft:()=>null
        }
    },
    SignUp,
    shipping:Shipping,
    PlaceOrder,
    Payment,
    PaymentGateWay 
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"white"
        },
        headerTintColor:"blue"
    }
});
const orderStackNavigator=createStackNavigator({
    OrderScreen:OrderHistory,
    OrderDetails
})
const drawerNavigator=createDrawerNavigator({
    Products: {
        screen:stackProductNavigator,
        navigationOptions:{
            drawerIcon:drawerConfig=>(
                <View>
                    <Ionicons name="cart-outline"size={24} color={drawerConfig.tintColor} />
                </View>
            )
        }},
    Orders:{
        screen:orderStackNavigator,
        navigationOptions:{
            drawerIcon:drawerConfig=>(
                <View>
                    <Ionicons name="md-list" color={drawerConfig.tintColor} size={23} />
                </View>
            )
        }}
},{
    contentOptions:{
        activeTintColor:'blue',
        inactiveTintColor:'red',
        labelStyle:{
            fontSize:16,
        }
    }
});
const authNavigator=createStackNavigator({
    signin:SignIn,
    signup:SignUp
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"white"
        },
        headerTintColor:"blue"
    }
})

export default createAppContainer(createSwitchNavigator({authNavigator,drawerNavigator}));

