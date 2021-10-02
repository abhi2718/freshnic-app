import React,{useReducer,useEffect} from 'react';
import {View,ScrollView,StyleSheet,ActivityIndicator,Alert,Text,TouchableWithoutFeedback} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import Input from '../../components/UI/input';
import logIn from '../../store/actions/signin';
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
const SignIn = props => {
  const [formState,dispatchFormState]=useReducer(formReducer,{
    inputValues:{
      email:'',
      password:'',
    },
    inputValidities:{
      email:false,
      password:false
    },
    isFormValid:false
  })
  const handleInputChange=(text,label,isValid)=>{
    dispatchFormState({
      type:UPDATE_INPUT,
      value:text,
      label,
      isValid
    })
  }
  const {email,password}=formState.inputValues;
  const dispatch=useDispatch();
  const handleSubmit=()=>{
     const giveAlert=msg=>Alert.alert("Wrong Input !",msg,[{
       text:'OKAY'
     }])
      if(!formState.isFormValid){
         if(email.length==0 && password.length==0){
           giveAlert("Please fill the form");
          return
         }
         giveAlert("Please check  the error in the form");
         return
      }
      dispatch(logIn({email,password}))
  }
let {isLoading,errMsg,userInfo}=useSelector(state=>state.authentication);
useEffect(()=>{
  if(errMsg ){
    alert(errMsg.errMsg);
    dispatch({type:"INITIAL_STATE"})
  }
},[errMsg])
 if(userInfo){
   return(
    <View>
      {
       userInfo?<View>
         {
           props.navigation.navigate("drawerNavigator")
         }
       </View>:null
      }
    </View>
   )
 }else{
  return(
    <ScrollView style={styles.container}>
     <View style={styles.formContainer}>
     <Text style={{textAlign:'center',color:"blue",fontSize:18,marginBottom:10}}>Welcome !</Text>
     <Input 
      label="Email"
      required
      field="email"
      email
      keyboardType="email-address"
      errMsg="Please enter valid email"
      handleInputChange={handleInputChange}
      initialValue=''
      intiallyValid={false}
     />
     <Input 
      label="Password"
      field="password"
      required
      password
      secureTextEntry={true} 
      errMsg="password must contain At least 8 characters,one uppercase ,one lowercase , one digit and one special character"
      handleInputChange={handleInputChange}
      initialValue=''
      intiallyValid={false}
     />
     {
       isLoading?<ActivityIndicator size="large" color="blue" />:
       <TouchableWithoutFeedback  onPress={handleSubmit}>
       <Text  style={styles.btnStyle}>Login</Text>
       </TouchableWithoutFeedback>
     }
     {
       isLoading?null:
       <View style={styles.row}>
       <Text>New user ? </Text>
       <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('signup')}>
         <Text style={{color:"blue"}}>register</Text>
       </TouchableWithoutFeedback>
     </View>
     }
     </View>
    </ScrollView> 
  )}
};
SignIn.navigationOptions={
  headerTitle:()=>(<Text style={{color:'blue'}}>FreshNic</Text>)
}

const styles = StyleSheet.create({
  container:{
      padding:20,
  },
  formContainer:{
    padding:20,
    backgroundColor:"white",
    borderRadius:20
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

export default SignIn;


