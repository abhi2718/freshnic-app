import React from 'react';
import { View,Text,ScrollView,ActivityIndicator,StyleSheet,Image} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import CreateTabNavigator from '../../components/shop/tabNavigator';
import tabData from '../../data/tabNavigatorData';
const OrderDetails =props=>{
    const dispatch=useDispatch();
    const {loading,updatedOrder,errMsg}=useSelector(state=>state.updatedOrder);
    const orderItems=updatedOrder?updatedOrder.orderItems:[];
    const orderItemsArr=orderItems.map(item=>(
        <View key={item._id} style={styles.row}>
        <Image
          style={{width:100,height:80}}
          source={{uri:item.image}}
        />
        <Text>{item.name}</Text>
        <Text>{'\u20B9'} {item.price} X  {item.qty}</Text>
        </View>
    ))
    
    return(
        <View style={{flex:1}}>
             <View style={{flex:0.9,padding:15}}>   
                 {
                     loading?<ActivityIndicator size="large" color="blue" />:
                     <View style={styles.orderList}>
                         <Text style={styles.textStyle}>Order Items</Text>
                        <ScrollView>
                             {orderItemsArr}
                        </ScrollView>
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
const styles=StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:8
    },
    textStyle:{
        textAlign:"center",
        padding:10,
        color:"blue",
        fontSize:18
    },
    orderList:{
        marginTop:50,
        backgroundColor:'white',
        padding:8,
        borderRadius:10
    },
    orderSummary:{
        backgroundColor:"white",
        marginTop:30,
        padding:10,
        borderRadius:10
    },
    label:{
        marginVertical:10
    }
})
export default OrderDetails ;