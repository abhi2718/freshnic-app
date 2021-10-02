import React,{useEffect,useState} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import paymentSuccess from '../../store/actions/updateOrder';
import OrderSummary from '../user/orderSummary';
import RazorpayCheckout from 'react-native-razorpay';
import orderHistory from '../../store/actions/orderHistory';
export default PaymentGateWay=props=>{
    const [paymentStatus,setPaymentStatus]=useState(false);
    const [errMsg,setErrMsg]=useState(false);
    const dispatch=useDispatch();
    const payment =useSelector(state=>state.payment);
    const {order:placedOrder}=useSelector(state=>state.order);
    const loadRazorpay=()=>{
      const order=payment.payment;
      const options = {
        description: '',
        image: 'https://lh5.googleusercontent.com/-CpGxqPZ5sUA/AAAAAAAAAAI/AAAAAAAAAAA/gyVECOjvSRU/s44-p-k-no-ns-nd/photo.jpg',
        currency: 'INR',
        key: 'rzp_test_YXsiwaRpNDe2mC',
        amount:order.amount,
        name: 'FreshNic',
        order_id:order.id,
        prefill: {
          email:order.email ,
          name:order.name,
          contact:order.contact
        },
        theme: {color: 'blue'}
      }
      RazorpayCheckout.open(options).then((data) => {
        dispatch(paymentSuccess(placedOrder._id,data.razorpay_payment_id)); 
        setErrMsg(false);
        setPaymentStatus(true);
        dispatch(orderHistory());
      }).catch((error) => {
        setErrMsg(true);
        alert(`Error: ${error.code} | ${error.description}`);
      });
    }
    useEffect(()=>{
        if(payment.payment){
           loadRazorpay()
        }
    },[payment.payment]);
    
    if(payment.loading){
        return(
            <View style={{flex:1,justifyContent:"center"}}>
              <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }else if(paymentStatus){
        return(
            <View style={{flex:1}}>
                <OrderSummary 
                  {...props}
                />
            </View>
        )
    }else if(errMsg){
      return(
        <View style={{flex:1,justifyContent:"center"}}>
         {
           props.navigation.navigate('Payment')
         }
        </View>
    )
    }
    else{
        return(
            <View style={{flex:1,justifyContent:"center"}}>
               <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }
   
};
PaymentGateWay.navigationOptions={
    headerTitle:()=>(<Text style={{color:'blue'}}>FreshNic</Text>),
    headerLeft:()=>null
}

