import React,{useReducer,useEffect,useState} from 'react';
import {View,ScrollView,StyleSheet,Keyboard,Alert,Text,TouchableWithoutFeedback} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import Input from '../../components/UI/input';
import shipping from '../../store/actions/shipping';

const UPDATE_INPUT="UPDATE_INPUT";
const formReducer=(state,action)=>{
       if(action.type==UPDATE_INPUT){
         const updatedValues={
           ...state.inputValues,
           [action.label]:action.value
         }
         const updatedValidities={
          ...state.inputValidities,
          [action.label]:action.isValid
         }
         let updatedFromIsValid=true;
         for(let key in updatedValidities){
           updatedFromIsValid=updatedFromIsValid && updatedValidities[key];
         }
        return{
          isFormValid:updatedFromIsValid,
          inputValidities:updatedValidities,
          inputValues:updatedValues
        }
       }
       return state;
}
const Shipping=props=>{
  const path=props.navigation.getParam("path");
  let {userInfo}=useSelector(state=>state.authentication);
  let {shipTo}=useSelector(state=>state.shipping);
  const [keyboardState,setKeyboardState]=useState(false);
  const [formState,dispatchFormState]=useReducer(formReducer,{
    inputValues:{
      name:shipTo?shipTo.name:'',
      address:shipTo?shipTo.address:'',
      contact:shipTo?shipTo.contact:'',
      postalCode:shipTo?shipTo.postalCode:'',
      country:shipTo?shipTo.country:''
    },
    inputValidities:{
      name:shipTo?true:false,
      address:shipTo?true:false,
      contact:shipTo?true:false,
      postalCode:shipTo?true:false,
      country:shipTo?true:false,
    },
    isFormValid:shipTo?true:false
  })
  const handleInputChange=(text,label,isValid)=>{
    dispatchFormState({
      type:UPDATE_INPUT,
      value:text,
      label,
      isValid
    })
  }
  const {name,postalCode,address,contact,country}=formState.inputValues;
  const dispatch=useDispatch();
  const handleSubmit=()=>{
     const giveAlert=msg=>Alert.alert("Wrong Input !",msg,[{
       text:'OKAY'
     }])
      if(!formState.isFormValid){
         if(name.length==0 && postalCode.length==0 && address.length==0 && contact.length==0 && country.length==0){
           giveAlert("Please fill the form");
          return
         }
         giveAlert("Please check  the error in the form");
         return
      }
      dispatch(shipping(formState.inputValues))
      if(userInfo){
        props.navigation.navigate({
          routeName:"PlaceOrder",
          params:{
            path
          }
        })
      }else{
        props.navigation.navigate("signin")
      }
  }

useEffect(()=>{
  Keyboard.addListener('keyboardDidShow',()=> setKeyboardState(true));
  Keyboard.addListener('keyboardDidHide',()=> setKeyboardState(false));
  // cleanup function 
  Keyboard.removeListener('keyboardDidShow',setKeyboardState)
  Keyboard.removeListener('keyboardDidHide',setKeyboardState)
},[Keyboard])
return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
        <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={{textAlign:'center',color:"blue",fontSize:18,marginBottom:10}}>Welcome !</Text>
        <Input 
        label="Name"
        required
        minLength={4}
        field="name"
        errMsg="Please enter valid name"
        handleInputChange={handleInputChange}
        initialValue={shipTo?shipTo.name:''}
        intiallyValid={true}
     />
    <Input 
     label="Address"
     field="address"
     required
     minLength={6}
     errMsg="Please enter valid address"
     handleInputChange={handleInputChange}
     initialValue={shipTo?shipTo.address:''}
     intiallyValid={true}
    />
     <Input 
     label="Contact"
     field="contact"
     required
     phone
     maxLength={10}
     minLength={10}
     keyboardType="phone-pad"
     errMsg="Please enter valid phone number"
     handleInputChange={handleInputChange}
     initialValue={shipTo?shipTo.contact:''}
     intiallyValid={true}
    />
     <Input 
     label="Postal Code"
     field="postalCode"
     required
     maxLength={6}
     minLength={6}
     keyboardType="phone-pad"
     errMsg="Please enter valid postal code"
     handleInputChange={handleInputChange}
     initialValue={shipTo?shipTo.postalCode:''}
     intiallyValid={true}
    />
    <Input 
     label="Country"
     field="country"
     required
     minLength={4}
     errMsg="Please enter valid country name"
     handleInputChange={handleInputChange}
     initialValue={shipTo?shipTo.country:''}
     intiallyValid={true}
    />
      <TouchableWithoutFeedback  onPress={handleSubmit}>
      <Text  style={styles.btnStyle}>Submit</Text>
      </TouchableWithoutFeedback>
    </View> 
    </ScrollView>
   </View>
  
    </View>
    )
}
Shipping.navigationOptions={
  title:"Shipping",
 
}
const styles = StyleSheet.create({
  container:{
      padding:20
  },
  formContainer:{
    padding:20,
    backgroundColor:"white",
    borderRadius:20,
    marginBottom:50
  },
  btnStyle:{
    padding:14,
    backgroundColor:"red",
    borderRadius:25,
    textAlign:"center",
    color:'white',
    marginTop:10
  },
  row:{
    flexDirection:"row",
    padding:10
  }
});

export default Shipping;