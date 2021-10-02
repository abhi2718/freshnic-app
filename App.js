import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import wishlistReducer from './store/reducers/wishList';
import orderNowReducer from './store/reducers/orderNow';
import shippingReducer from './store/reducers/shipping';
import authenticationReducer from './store/reducers/authentication';
import StackNavigator from './navigation/productNavigator';
import placeOrderReducer from './store/reducers/order';
import paymentReducer from './store/reducers/payment';
import updateOrderReducer from './store/reducers/updateOrder';
import OrderHistoryReducer from './store/reducers/orderHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [getCartItem,setCartItem]=useState([]);
  const [getWishListItem,setWishListItem]=useState([]);
  const [getUserInfo,setUserInfo]=useState(null);
  const [getShippingAddress,setShippingAddress]=useState(null);
  useEffect(()=>{
    async function getDataFromAsynStorage(key){
      try{
         const data=await AsyncStorage.getItem(key);
          switch(key){
            case "cartItem":
                return setCartItem(JSON.parse(data));
            case "wishListItems":
                return setWishListItem(JSON.parse(data));
            case "userInfo":
                return setUserInfo(JSON.parse(data));  
            case "shipping":
                return setShippingAddress(JSON.parse(data));
          }
         
      }catch(e){
        console.log(e);
      }
    }
    getDataFromAsynStorage("cartItem");
    getDataFromAsynStorage("wishListItems");
    getDataFromAsynStorage("userInfo");
    getDataFromAsynStorage("shipping");
  },[])
  
  const initialStoreState = {
    cart: {
      cartItem:getCartItem?getCartItem:[]
    },
    wishList:{
      wishListItems:getWishListItem?getWishListItem:[]
    },
    authentication:{
       userInfo:getUserInfo?getUserInfo:null
    },
    shipping:{
       shipTo:getShippingAddress?getShippingAddress:null
    }
  };
  const rootReducer=combineReducers({
    products:productReducer,
    cart:cartReducer,
    wishList: wishlistReducer,
    orderNow:orderNowReducer,
    authentication:authenticationReducer,
    shipping:shippingReducer,
    order:placeOrderReducer,
    payment:paymentReducer,
    updatedOrder:updateOrderReducer,
    orderHistory:OrderHistoryReducer
  });
  const store=createStore(rootReducer,initialStoreState,applyMiddleware(thunk));
  return (
    <SafeAreaProvider>
        <Provider  store={store}>
         <StackNavigator />
         <StatusBar style="auto" />
        </Provider>
    </SafeAreaProvider>  
  );
}
