import React from 'react';
import {View,ScrollView, Button,Text } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import CartItem from '../../components/shop/cartItem';
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
const CartScreen=props=>{
    const {cartItem}=useSelector(state=>state.cart);
    const calculateTotalPrice=()=>{
       let totalPrice=0;
       cartItem.forEach(element => {
          totalPrice=totalPrice+(element.qty*element.price);
       });
       return totalPrice;
    }
   const dispatch=useDispatch();
    const  itemsInCart=cartItem.map(item=>(
      <CartItem key={item.id} {...item}/>
    ))
    return(
           <View style={{flex:1}}>
             <View style={{flex:0.9}}>
                 {
                  cartItem.length>0?
                  <View style={{padding:10,backgroundColor:"white",marginVertical:20}}>
                  <Text style={{marginBottom:10}}>{cartItem.length} {cartItem.length==0?"item":"items"} in basket {'\u20B9'} { calculateTotalPrice()}</Text>
                  <Button color="red" title=" Proceed to Checkout" onPress={()=>{
                     dispatch({type:'INITIAL_STATE_OF_ORDER'});
                     props.navigation.navigate({
                        routeName:"shipping",
                        params:{
                           path:"fromCart"
                        }
                     })
                  }} />
                  </View>:
                   <View style={{width:"100%",height:"100%",justifyContent:"center",padding:10}}>
                  <Text style={{textAlign:"center",margin:10}}>Your basket is empty </Text>
                   <Button color="red" title="Go Shopping" onPress={()=>props.navigation.navigate("Products")} />
                  </View>
                  }
               <ScrollView>
                  {
                     itemsInCart
                  }
               </ScrollView>
            </View>
                <View style={{flex:0.1,justifyContent:"flex-end",maxHeight:50}}>
                  <CreateTabNavigator
                   tabData={tabData} 
                   {...props} 
                 />
               </View>
           </View>
    );
}


export default CartScreen;