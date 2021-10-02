import React,{useReducer} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
const UPDATE_INPUT_TEXT="UPDATE_INPUT_TEXT";
const ON_INPUT_BLUR="ON_INPUT_BLUR";
const inputReducer=(state,action)=>{
  switch(action.type){
    case UPDATE_INPUT_TEXT:
      return{
        ...state,
        value:action.value,
        isValid:action.isValid
      }
    case ON_INPUT_BLUR:
      return{
        ...state,
        touched:true
      }
   default:
    return state
  }
}

const Input = props => {
  const {label,errMsg,handleInputChange,initialValue,intiallyValid,field,setKeyboardState}=props;
  const [inputState,dispatch]=useReducer(inputReducer,{
    value:initialValue?initialValue:"",
    isValid:intiallyValid,
    touched:false
  })
const handleTextChange=text=>{
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let isValid = true;
const passwordRegex=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const phoneReges=/^[789]\d{9}$/;
if (props.required && text.trim().length === 0) {
  isValid = false;
}
if(props.password && !passwordRegex.test(text)){
  isValid = false;
}
if(props.phone && !phoneReges.test(text)){
  isValid = false;
}
if (props.email && !emailRegex.test(text.toLowerCase())) {
  isValid = false;
}
if (props.min != null && +text < props.min) {
  isValid = false;
}
if (props.max != null && +text > props.max) {
  isValid = false;
}
if (props.minLength != null && text.length < props.minLength) {
  isValid = false;
}

    dispatch({
      type:UPDATE_INPUT_TEXT,
      value:text,
      isValid
    });
    handleInputChange(text,field,isValid);
}
const lostFocus=()=>{
  dispatch({type:ON_INPUT_BLUR});
  if(setKeyboardState){
    setKeyboardState(false)
  }
}
 return(
    <View style={styles.conatiner}>
    <Text style={{paddingLeft:10,paddingBottom:10}}>{label}</Text>
    <TextInput
      style={styles.inputStyle}
      {...props}
      placeholder={label}
      value={inputState.value}
      onChangeText={text=>handleTextChange(text)}
      onBlur={lostFocus}
      placeholderTextColor="black"
    />
    {
      !inputState.isValid && inputState.touched?
      <View>
        <Text style={styles.errMsg}>{errMsg}</Text>
      </View>
      :null
    }
    </View>
 )
};


const styles = StyleSheet.create({
  conatiner:{
    marginVertical:10
  },
  inputStyle:{
   borderColor:"blue",
   borderWidth:1,
   paddingVertical:10,
   paddingHorizontal:20,
   borderRadius:25
  },
  errMsg:{
    color:"red",
    marginLeft:15,
    marginTop:8,
    textAlign:'justify'
  }
});

export default Input;