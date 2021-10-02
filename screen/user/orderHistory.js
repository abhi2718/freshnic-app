import React,{useEffect} from 'react';
import {View,Text,ActivityIndicator,StyleSheet,Button,ScrollView} from 'react-native';
import CreateTabNavigator from '../../components/shop/tabNavigator';
import orderHistory from '../../store/actions/orderHistory';
import tabData from '../../data/tabNavigatorData';
import {useDispatch,useSelector} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

const OrderHistory=props=>{
  const dispatch=useDispatch();
  const {loading,errMsg,myOrders}=useSelector(state=>state.orderHistory);
  console.log(myOrders)
    useEffect(()=>{
      dispatch(orderHistory());
    },[]);
    return(
        <View style={{flex:1}}>
             <View style={{flex:0.9}}>
               {
                 loading?
                 <View style={{flex:1,justifyContent:"center"}}>
                     <ActivityIndicator size="large" color="blue" />
                 </View>:
                 <View>
                   <ScrollView>
                   {
                      myOrders.map(order=>(
                      <View style={styles.container} key={order._id}>
                        <Text style={styles.textStyle}>order Id :-   {order._id}</Text>
                        <Text style={styles.textStyle}>Order At :- {order.updatedAt.substring(0,10)} </Text>
                        <Text style={styles.textStyle}>Order Status :-     {order.isDelivered?"Delivered":"Not delivered yet"}</Text>
                        <Text style={styles.textStyle}>Payment Status  :-  {order.payment.isPaid?"Paid":"unpaid"}</Text>
                        <Text style={styles.textStyle}>Total Price :-  {'\u20B9'} {order.totalPrice}</Text>
                        <Text>payment_ID {order.payment_ID}</Text>
                        <Button 
                         title="show more"
                         onPress={()=>props.navigation.navigate("OrderDetails")} 
                         />
                      </View>))
                    }
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
OrderHistory.navigationOptions = headerData => {
    return {
      headerTitle:()=>(
         <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{marginLeft:10,fontSize:18,color:"blue"}}>Yours Orders</Text>
         </View>
      ),
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
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
    container:{
      backgroundColor:"white",
      margin:20,
      padding:10
    },
    textStyle:{
      padding:10
    }
  })
export default  OrderHistory;