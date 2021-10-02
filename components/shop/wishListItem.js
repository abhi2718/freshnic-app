import React from 'react';
import {View,Text,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {deleteFromWishList} from '../../store/actions/wishlist';
import {useDispatch} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import addToCart from '../../store/actions/cart';
const WishListItem=props=>{
    const dispatch=useDispatch();
    const {imageUrl,id,title,item,navigation}=props;
    return(
        <View style={styles.rowStyle}>
               <TouchableWithoutFeedback onPress={() => props.navigation.navigate(
                    {
                      routeName: 'OverView',
                      params: {
                        id,
                        title,
                        action: qty => dispatch(addToWishList({...item, qty }))
                      }
                    }
                  )}>
                   <View style={styles.itemStyle}>
                      <Image style={{width:100,height:80}} source={{uri:imageUrl}} />
                      <Text style={styles.textStyle}>{title}</Text>  
                 </View> 
             </TouchableWithoutFeedback>

             <TouchableWithoutFeedback onPress={()=>{
                    dispatch(addToCart(item));
                    dispatch(deleteFromWishList(id));
                    navigation.navigate("Basket");
               }}>
                   <View style={styles.itemStyle}>
                       <Ionicons name="cart" size={24} color="red" />
                        <Text style={styles.textStyle}>Add to cart</Text>
                   </View>
             </TouchableWithoutFeedback>

             <TouchableWithoutFeedback onPress={()=>dispatch(deleteFromWishList(id))}>
                 <View style={styles.itemStyle} >
                    <MaterialCommunityIcons name="delete-empty" size={24} color="red" />
                    <Text style={styles.textStyle} >Delete</Text>
                 </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles=StyleSheet.create({
    rowStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        padding:5,
        marginVertical:10
    },
    itemStyle:{
        alignItems:"center"
    },
    textStyle:{
        color:"blue",
        fontSize:12
    }
})
export default WishListItem;