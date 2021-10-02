import React,{useEffect} from 'react';
import {View,Text,ActivityIndicator,StyleSheet,Button} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import paymentAction from '../../store/actions/payment';

export default Payment=props=>{
    const dispatch=useDispatch();
    const {loading,errMsg,order}=useSelector(state=>state.order);
    useEffect(()=>{
       if(errMsg){
            alert("some thing went wrong !")
        } 
    },[errMsg])
    return(
        <View style={{flex:1,justifyContent:"center",padding:20}}>
        {
          loading?
          <View>
            <ActivityIndicator size="large" color='blue' />
          </View>
          :
          <View style={styles.container}>
             <View style={styles.row}>
               <Text style={styles.textStyle}>Items Price</Text>
               <Text style={styles.textStyle}> {'\u20B9'} {order.itemsPrice}</Text>
             </View>
             <View style={styles.row}>
               <Text style={styles.textStyle}>Tax</Text>
               <Text style={styles.textStyle}>{'\u20B9'} {order.taxPrice}</Text>
             </View>
             <View style={styles.row}>
               <Text style={styles.textStyle}>Shipping</Text>
               <Text style={styles.textStyle}>Free</Text>
             </View>
             <View style={styles.row}>
               <Text style={styles.textStyle}>Total Price</Text>
               <Text style={styles.textStyle}>{'\u20B9'} {order.totalPrice}</Text>
             </View>
             <View style={styles.btnStyle}>  
                 <Button 
                   title="pay now"
                   color="red"
                   onPress={()=>{
                     dispatch(paymentAction(order));
                     props.navigation.navigate("PaymentGateWay");
                  }}
                 />
             </View>
          </View>
        }
        </View>
    )
}

const styles=StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:"white",
    borderRadius:10
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  btnStyle:{
    marginVertical:15
  },
  textStyle:{
    marginVertical:6,
    fontSize:16,
  
  }
})