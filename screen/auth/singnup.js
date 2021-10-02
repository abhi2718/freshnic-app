import React,{useReducer,useEffect} from 'react';
import {View,ScrollView,StyleSheet,ActivityIndicator,Alert,Text,TouchableWithoutFeedback} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import Input from '../../components/UI/input';
import register from '../../store/actions/signup';
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

const SignUp=props=>{
    const [formState,dispatchFormState]=useReducer(formReducer,{
        inputValues:{
          email:'',
          password:'',
          name:'',
          confirmPassword:''
        },
        inputValidities:{
          email:false,
          password:false,
          name:false,
          confirmPassword:false
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
      const {email,password,name,confirmPassword}=formState.inputValues;
      const dispatch=useDispatch();
      const handleSubmit=()=>{
         const giveAlert=msg=>Alert.alert("Wrong Input !",msg,[{
           text:'OKAY'
         }])
          if(!formState.isFormValid){
             if(email.length==0 && password.length==0 && name.length==0 && confirmPassword.length==0){
               giveAlert("Please fill the form");
              return
             }
             giveAlert("Please check  the error in the form");
             return
          }
          dispatch(register({name,email,password}))
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
        <Text style={{textAlign:'center',color:"blue",fontSize:18,marginBottom:10}}>Register</Text>
        <Input 
         label="Name"
         field="name"
         required
         minLength={6}
         errMsg="name must contain At least 6 characters"
         handleInputChange={handleInputChange}
         initialValue=''
         intiallyValid={false}
        />
        <Input 
         label="Email"
         field="email"
         keyboardType="email-address"
         required
         email
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
       <Input 
         label="Confirm Password"
         field="confirmPassword"
         required
         password
         secureTextEntry={true} 
         errMsg={password!=confirmPassword?'Password and Confirm Password did not match !':"password must contain At least 8 characters,one uppercase ,one lowercase , one digit and one special character"}
         handleInputChange={handleInputChange}
         initialValue=''
         intiallyValid={false}
        />
        
        {
          isLoading?<ActivityIndicator size="large" color="blue" />:
          <TouchableWithoutFeedback  onPress={handleSubmit}>
          <Text  style={styles.btnStyle}>Register</Text>
          </TouchableWithoutFeedback>
        }
        {
          isLoading?null:
          <View style={styles.row}>
            <Text>Existing user? </Text>
            <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('signin')}>
            <Text style={{color:"blue"}}>login</Text>
            </TouchableWithoutFeedback>
          </View>
        }
        </View>
       </ScrollView> 
     )
}
}
SignUp.navigationOptions={
  headerTitle:()=>(<Text style={{color:'blue'}}>FreshNic</Text>),
  headerLeft:()=>null
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
  
export default SignUp;
