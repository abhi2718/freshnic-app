import React from 'react';
import {Text,View,StyleSheet,FlatList,Image,Button} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import placeOrder from '../../store/actions/order';
export default PlaceOrder=props=>{
    const path=props.navigation.getParam("path");
    const dispatch=useDispatch();
    const cartItem=path=="orderNow"?[{
        ...useSelector(state=>state.orderNow.orderNow)
    }]:useSelector(state=>state.cart.cartItem);
    const calculateTotalPrice=()=>{
        let totalPrice=0;
        cartItem.forEach(element => {
           totalPrice=totalPrice+(element.qty*element.price);
        });
        return totalPrice;
     }
    
    return(
        <View style={styles.container}>
             {
                  cartItem.length>0?
                  <View style={{padding:10,backgroundColor:"white",marginVertical:20}}>
                  <Text style={{marginBottom:10}}>{cartItem.length} {cartItem.length==0?"item":"items"} in basket {'\u20B9'} { calculateTotalPrice()}</Text>
                     <Button color="red" title="Place Order" onPress={()=>{
                        dispatch(placeOrder(10,calculateTotalPrice(),(calculateTotalPrice()+10),path));
                        props.navigation.navigate("Payment");
                    }} />
                  </View>:
                   <View style={{width:"100%",height:"100%",justifyContent:"center",padding:10}}>
                  <Text style={{textAlign:"center",margin:10}}>Your basket is empty </Text>
                   <Button color="red" title="Go Shopping" onPress={()=>props.navigation.navigate("Products")} />
                  </View>
            }
            <FlatList 
              data={cartItem}
              renderItem={itemInCart=>(
                <View style={styles.row}>
                    <Image
                      style={{width:100,height:80}}
                      source={{uri:itemInCart.item.imageUrl}}
                    />
                    <Text>{itemInCart.item.title}</Text>
                    <Text>{'\u20B9'} {itemInCart.item.price} X  {itemInCart.item.qty}</Text>
                </View>
              )
              }
            />
        </View>
    )
}

PlaceOrder.navigationOptions={
    headerTitle:"FreshNic "
}
const styles=StyleSheet.create({
     container:{
         flex:1,
     },
     row:{
         flexDirection:"row",
         backgroundColor:"white",
         justifyContent:"space-between",
         alignItems:'center',
         paddingHorizontal:10,
         marginVertical:15
     }
})

