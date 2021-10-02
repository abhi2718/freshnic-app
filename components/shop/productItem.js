import React from 'react';
import { StyleSheet, Text, View,TouchableWithoutFeedback,ImageBackground} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector,useDispatch} from 'react-redux';
import addToCart from '../../store/actions/cart';
const ProductItem=props=>{
    const {imageUrl,price,title,id,viewDetail,navigation}=props;
    const dispatch=useDispatch();
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(product=>product.id==id));
    return(
        <TouchableWithoutFeedback onPress={viewDetail}>
         <View style={styles.card}>
             <ImageBackground style={{width:"100%",height:180}} source={{uri:imageUrl}}  >
               <View style={styles.row}>
                 <View style={styles.badgeStyle}>
                     <Text style={styles.textStyle}>Best Saller</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={
                      ()=>{
                        dispatch(  addToCart({
                            ...selectedProduct,
                            qty:1
                        }))
                         navigation.navigate({routeName:"Basket"});
                         }
                  }>
                    <View style={styles.addToCartStyle}>
                     <Ionicons name="cart" color="white" size={25}  />
                    </View>
                  </TouchableWithoutFeedback>
               </View>
            </ImageBackground>
             <View style={styles.titleStyle}>
                      <Text>{title}</Text>
                      <Text>Price: {'\u20B9'}{price}</Text>
             </View>
          </View>
       </TouchableWithoutFeedback>
    );
}

const styles=StyleSheet.create({
    screen:{
        width:'100%',
        height:'100%',
     },
    card:{
        flex:1,
        backgroundColor:'white',
        margin:10,
        elevation:15,
    },
    img:{
        width:200,
        height:180
    },
    titleStyle:{
      padding:10
    },
    badgeStyle:{
      width:80,
      backgroundColor:"red",
      elevation:15,
      borderBottomRightRadius:20,
      borderTopRightRadius:20
    },
    textStyle:{
      color:"white",
      fontSize:14,
      fontWeight:"500",
      padding:4
    },
    row:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    },
    addToCartStyle:{
       width:40,
       height:40,
       backgroundColor:"black",
       alignItems:"center",
       justifyContent:"center",
       elevation:15
    }
  });
export default  ProductItem;