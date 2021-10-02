import React,{useState,useEffect} from 'react';
import {View,Text,ScrollView,Image,StyleSheet, Button,Picker,TouchableWithoutFeedback} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import addToCart from '../../store/actions/cart';
import {Ionicons} from '@expo/vector-icons'; 
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
import orderNow from '../../store/actions/orderNow';
const ProductDetail=props=>{
    const {wishListItems}= useSelector(state=>state.wishList);
    const [qty, setQty] = useState("");
    const id=props.navigation.getParam("id");
    const dispatch=useDispatch();
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(product=>product.id==id));
    useEffect(()=>{
        props.navigation.setParams({qty});
        props.navigation.setParams({wishListItems});
    },[qty,wishListItems])
    const options=()=>{
        let optionsArray=[];
        for(let i=1;i<=selectedProduct.qtyInStock;i++){
               let option=<Picker.Item key={i}  value={`${i}`} label={`${i}`} />
               optionsArray.push(option)
        }
        return optionsArray;
    }

    return(
            <View style={{flex:1}}>
               <View style={{flex:0.9}}>
                <ScrollView>                
                <View>
                   <Image style={{width:"99%",height:300,}} source={{uri:selectedProduct.imageUrl}} />
                </View>
                <View style={styles.row}>
                     <Text  numberOfLines={1}>Price: {'\u20B9'} {selectedProduct.price}</Text>
                     <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                     <Text>qty :</Text>
                     <Picker
                      selectedValue={qty}
                      onValueChange={val=>setQty(val)}
                      style={{width:100,height:50}}>
                          { options()}
                      </Picker>
                     </View>
                </View>
                <View style={styles.description}>
                    <Text style={{fontWeight:"bold"}}>Description :- </Text>
                    <Text style={{textAlign:"justify",color:"blue"}}>{selectedProduct.description}</Text>
                </View>
               <View style={styles.btnStyle}>
               <Button 
                 color="blue" 
                 title="Order Now" 
                 onPress={()=>{
                    dispatch({type:'INITIAL_STATE_OF_ORDER'})
                    dispatch(orderNow({
                        ...selectedProduct,
                        qty:qty==""?1:qty
                    }))
                    props.navigation.navigate(
                        {
                          routeName: 'shipping',
                          params: {
                           path:"orderNow"
                          }
                        }
                      )
                 }}/> 
                 <View style={{marginTop:10}}>
                 <Button 
                 color="red" 
                 title="Add To Cart" 
                 onPress={()=>{
                    dispatch(  addToCart({
                        ...selectedProduct,
                        qty
                    }))
                    props.navigation.navigate({routeName:"Basket"});
                     }
                  } 
                 /> 
                 </View>
                 </View>
             </ScrollView>
               </View>
               <View style={{flex:0.1,justifyContent:"flex-end",maxHeight:50}}>
                 <CreateTabNavigator
                   tabData={tabData} 
                  {...props} 
                 />
             </View>
           </View>
    )
}
ProductDetail.navigationOptions=navData=>{
    const title=navData.navigation.getParam("title");
    const id=navData.navigation.getParam("id");
    const action=navData.navigation.getParam("action");
    const qty=navData.navigation.getParam("qty")?
          navData.navigation.getParam("qty"):"1";
    const wishListItems=navData.navigation.getParam("wishListItems")?
          navData.navigation.getParam("wishListItems"):[];
    const isItemaddedInWishList=wishListItems.some(item=>item.id===id);
    return{
         headerTitle:title,
         headerRight:()=>(
            <TouchableWithoutFeedback  onPress={()=>action(qty)}>
             <View style={{alignItems:"center",marginHorizontal:10}}>
             <Ionicons 
             name={isItemaddedInWishList?"heart":"ios-heart-outline"}
             size={23} 
             color="red" 
             />
             </View>
             </TouchableWithoutFeedback>
        )
    }
}
const styles=StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20
    },
    description:{
        paddingHorizontal:20
    },
    btnStyle:{
        padding:20,
    }
})
export default ProductDetail;