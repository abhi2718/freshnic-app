import React,{useEffect,useState} from 'react';
import {FlatList,View,StyleSheet,Image,Text,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/productItem';
import addToWishList from '../../store/actions/wishlist';
import {Ionicons} from '@expo/vector-icons'; 
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
import getProducts from '../../store/actions/products';
const ProductsScreen=props=>{
    const {availableProducts,isLoading} =useSelector(state=>state.products);
    const dispatch=useDispatch();
    const {navigation}=props;
    const [isFetching, setIsFetching] = useState(false);
    const fetchData = () => {
      dispatch(getProducts());
      setIsFetching(false);
    };
    
    const onRefresh = () => {
      setIsFetching(true);
      fetchData();
    };
    useEffect(()=>{
       dispatch(getProducts())
    },[dispatch])
    if(isLoading){
      return(
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="blue" />
          </View>
      )
    }else{
      return (
        <View style={{flex:1}}>
          <View style={{flex:0.9}}>
          <View style={styles.screen}>
            <FlatList 
              numColumns={2} 
              onRefresh={onRefresh}
              refreshing={isFetching}
              data={availableProducts}
              renderItem={dataItem=>(
              <ProductItem 
               {...dataItem.item}
               viewDetail={
                 () => props.navigation.navigate(
                   {
                     routeName: 'OverView',
                     params: {
                       id: dataItem.item.id,
                       title: dataItem.item.title,
                       action: qty => dispatch(addToWishList({ ...dataItem.item, qty })),
                     }
                   }
                 )}
                 navigation={navigation}
               />
              )}
            />
       </View>
   </View>
   <View style={{ flex: 0.1, justifyContent: "flex-end", maxHeight: 50 }}>
     <CreateTabNavigator
       tabData={tabData}
       {...props}
     />
   </View>
 </View>
)
}
    
}

ProductsScreen.navigationOptions = headerData => {
  return {
    headerTitle:()=>(
       <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image style={{width:40,height:40}} source={{uri:"https://lh5.googleusercontent.com/-CpGxqPZ5sUA/AAAAAAAAAAI/AAAAAAAAAAA/gyVECOjvSRU/s44-p-k-no-ns-nd/photo.jpg"}} />
          <Text style={{marginLeft:10,fontSize:18,color:"blue"}}>FreshNic</Text>
       </View>
    ),
    headerStyle: {
      backgroundColor: "white"
    },
    headerTintColor: "black",
    headerRight: () => (
      <Ionicons style={{ marginRight: 15 }} name="cart-outline" size={23} color="blue" onPress={() => headerData.navigation.navigate("Basket")} />
    ),
    headerLeft:()=>(
      <View style={{marginLeft:20}}>
        <Ionicons 
         name='ios-menu'
         color="blue"
         size={25}
         onPress={()=>headerData.navigation.toggleDrawer()}
       />
       
      </View>
    )
  }
}
const styles=StyleSheet.create({
  screen:{
      width:'100%',
      height:'100%'
   },
   loaderStyle:{
     flex:1,
     justifyContent:"center",
     alignItems:"center"
   }
  })
export default ProductsScreen;


