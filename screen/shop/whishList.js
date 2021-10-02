import React from 'react';
import {View,FlatList,Button,Text} from 'react-native';
import WishListItem  from '../../components/shop/wishListItem';
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
import {useSelector} from 'react-redux';
const WishList=props=>{
    const {wishListItems}= useSelector(state=>state.wishList);
    return(
        <View style={{flex:1}}>
           <View style={{flex:0.9}}>
             {
               wishListItems.length>0?
               <FlatList 
                 data={wishListItems}
                 renderItem={dataItem=>(
                 <WishListItem 
                  {...dataItem.item}  
                  item={dataItem.item}
                  navigation={props.navigation}
                 />
               )}
              />:<View style={{
                    flex:1,
                    justifyContent:"center",
                    padding:10
                    }}>
                   <Text style={{textAlign:"center",marginBottom:10}}>Your wishList is empty </Text>
                   <Button 
                    title="Go shopping " 
                    color="red"
                    onPress={()=>props.navigation.navigate("Products")}
                   />
                 </View>
             }
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

export default WishList;